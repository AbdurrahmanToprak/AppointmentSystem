using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class DoctorController : Controller
	{
		private readonly ApplicationDbContext _context;

		public DoctorController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet("profile/{userId}")]
		[Authorize] // JWT doğrulaması zorunlu
		public IActionResult GetDoctorProfile([FromRoute] int userId)
		{
			var roleIdClaim = User.FindFirst("RoleId")?.Value;
			if (roleIdClaim == null || roleIdClaim != "2")
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
		[Authorize]
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
	}
}

