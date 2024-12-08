using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

namespace AppointmentSystem.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize(Roles = "2")]
	public class DoctorController : Controller
	{
		private readonly ApplicationDbContext _context;

		public DoctorController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet("profile/{userId}")]
		public IActionResult GetDoctorProfile([FromRoute] int userId)
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
			if ( userIdClaim == null)
			{
				return Unauthorized(new { message = "Yetkisiz erişim." });
			}

			var doctor = _context.Users
				.Where(u => u.UserId == userId && u.RoleId == 2)
				.Select(u => new
				{
					u.UserId,
					u.Name,
					u.Surname,
					u.Email,
					u.ImageUrl
				})
				.FirstOrDefault();

			if (doctor == null)
			{
				return NotFound(new { message = "Doktor bulunamadı." });
			}

			return Ok(doctor);
		}

		[HttpGet("appointments")]
		[Authorize] // JWT doğrulaması zorunlu
		public IActionResult GetDoctorAppointments([FromRoute] int userId)
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı bilgileri eksik." });
			}

			var appointments = _context.Appointments
				.Where(a => a.DoctorId == userId)
				.Select(a => new
				{
					a.AppointmentId,
					a.DateTime,
					a.Time,
					a.Status,
					a.PatientId,
					PatientName = a.Patient.Name + " " + a.Patient.Surname
				})
				.ToList();

			if (appointments == null || !appointments.Any())
			{
				return NotFound(new { message = "Hiç randevu bulunamadı." });
			}

			return Ok(appointments);
		}

		[HttpPost("appointments/{appointmentId}/result")]
		public IActionResult AddAppointmentResult([FromRoute] int appointmentId, [FromBody] Result result)
		{
			// Kullanıcı doğrulaması
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı bilgileri eksik." });
			}

			// Randevuyu kontrol et
			var appointment = _context.Appointments
				.FirstOrDefault(a => a.AppointmentId == appointmentId);

			if (appointment == null)
			{
				return NotFound(new { message = "Randevu bulunamadı." });
			}

			// Randevunun doktoru ile eşleşme kontrolü
			if (appointment.DoctorId.ToString() != userIdClaim)
			{
				return Unauthorized(new { message = "Bu randevuyu sadece doktor görüntüleyebilir ve güncelleyebilir." });
			}

			// Sonucu ekle
			result.DoctorId = appointment.DoctorId;
			result.PatientId = appointment.PatientId;

			_context.Results.Add(result);
			_context.SaveChanges();

			return CreatedAtAction(nameof(AddAppointmentResult), new { id = result.ResultId }, result);
		}

		[HttpPut("profile/{userId}")]
		public async Task<IActionResult> UpdateDoctorProfile([FromRoute] int userId, [FromBody] User user, [FromForm] IFormFile image)
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userIdClaim == null || userIdClaim != userId.ToString())
			{
				return Unauthorized(new { message = "Bu profili yalnızca sahip olan kullanıcı güncelleyebilir." });
			}

			var doctor = _context.Users.FirstOrDefault(u => u.UserId == userId && u.RoleId == 2);
			if (doctor == null)
			{
				return NotFound(new { message = "Doktor bulunamadı." });
			}

			if (image != null && image.Length > 0)
			{
				var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images");
				if (!Directory.Exists(uploadsFolder))
				{
					Directory.CreateDirectory(uploadsFolder); // Eğer klasör yoksa oluşturulur
				}
				var filePath = Path.Combine(uploadsFolder, image.FileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await image.CopyToAsync(stream);
				}

				doctor.ImageUrl = "~/Images/" + image.FileName;
			}

			doctor.Name = user.Name;
			doctor.Surname = user.Surname;
			doctor.Email = user.Email;
			doctor.ImageUrl = user.ImageUrl;

			_context.Users.Update(doctor);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Profil başarıyla güncellendi." });
		}
	}
}

