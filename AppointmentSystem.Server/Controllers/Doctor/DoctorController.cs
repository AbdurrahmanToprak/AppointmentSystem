using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

namespace AppointmentSystem.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize(Roles ="2")]

	public class DoctorController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public DoctorController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet("profile")]
		public IActionResult GetDoctorProfile()
		{
			// Kullanıcı ID'sini token'dan alıyoruz
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Yetkisiz erişim." });
			}

			int userId = int.Parse(userIdClaim.Value); // Token'dan gelen ID'yi alıyoruz

			// Doktorun bilgilerini veritabanından sorguluyoruz
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

			// Eğer doktor bulunamazsa hata döndürüyoruz
			if (doctor == null)
			{
				return NotFound(new { message = "Doktor bulunamadı." });
			}

			// Doktor bilgilerini döndürüyoruz
			return Ok(doctor);
		}


		[HttpGet("appointments")]

		public async Task<IActionResult> GetDoctorAppointments()
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı bilgileri eksik." });
			}
			var userId = int.Parse(userIdClaim);

			var appointments = await _context.Appointments
				.Where(a => a.DoctorId == userId)
				.Select(a => new
				{
					a.AppointmentId,
					a.DateTime,
					a.Time,
					a.Status,
					a.PatientId,
					a.CreatedDate,
					PatientName = a.Patient.Name + " " + a.Patient.Surname
				})
				.ToListAsync();

			if (appointments == null || !appointments.Any())
			{
				return NotFound(new { message = "Hiç randevu bulunamadı." });
			}

			var now = DateTime.Now;

			// Geçmiş randevuları güncelle
			var pastAppointments = await _context.Appointments
				.Where(a => a.DoctorId == userId && a.DateTime < now && a.Status == true)
				.ToListAsync();

			if (pastAppointments.Any())
			{
				foreach (var appointment in pastAppointments)
				{
					appointment.Status = false; // Geçmiş randevuların statüsünü güncelle
				}

				// Değişiklikleri kaydet
				await _context.SaveChangesAsync();
			}

			return Ok(appointments);
		}

		[HttpPost("appointments/result")]
		public async Task<IActionResult> AddAppointmentResult([FromBody] Result result)
		{
			// Kullanıcı doğrulaması
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı bilgileri eksik." });
			}
			var userId = int.Parse(userIdClaim);

			// appointmentId'yi result'tan alıyoruz
			var appointmentId = result.AppointmentId;

			// Randevuyu kontrol et
			var appointment = await _context.Appointments
				.FirstOrDefaultAsync(a => a.AppointmentId == appointmentId && a.DoctorId == userId);

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

			// Sonuç kaydetme
			_context.Results.Add(result);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = "Sonuç kaydedilemedi.", error = ex.Message });
			}

			return CreatedAtAction(nameof(AddAppointmentResult), new { id = result.ResultId }, result);
		}



		[HttpPut("profile/{userId}")]
		public async Task<IActionResult> UpdateDoctorProfile([FromRoute] int userId,
	[FromForm(Name = "name")] string Name,
	[FromForm(Name = "surname")] string Surname,
	[FromForm(Name = "email")] string Email,
	[FromForm] IFormFile image)
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
				var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "image", "user");
				if (!Directory.Exists(uploadsFolder))
				{
					Directory.CreateDirectory(uploadsFolder); // Eğer klasör yoksa oluşturulur
				}
				var filePath = Path.Combine(uploadsFolder, image.FileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await image.CopyToAsync(stream);
				}

				doctor.ImageUrl = "~/image/" + image.FileName;
			}

			doctor.Name = Name;
			doctor.Surname = Surname;
			doctor.Email = Email;

			_context.Users.Update(doctor);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Profil başarıyla güncellendi." });
		}

		[HttpGet("results")]
		public async Task<IActionResult> GetDoctorResults()
		{
			// Kullanıcı kimliği doğrulaması
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı bilgileri eksik." });
			}
			var userId = int.Parse(userIdClaim);

			// Doktora ait sonuçları al
			var results = await _context.Results
				.Where(r => r.DoctorId == userId)
				.Select(r => new
				{
					r.ResultId,
					r.Message,
					r.PatientId,
					PatientName = _context.Users
						.Where(u => u.UserId == r.PatientId)
						.Select(u => u.Name + " " + u.Surname)
						.FirstOrDefault(),
					r.CreatedDate
				})
				.ToListAsync();

			if (results == null || !results.Any())
			{
				return NotFound(new { message = "Sonuç bulunamadı." });
			}

			return Ok(results);
		}

	


	}
}

