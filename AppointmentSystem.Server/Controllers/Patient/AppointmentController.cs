using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers.Patient
{
	[Route("api/patient/appointment")]
	[ApiController]
	[Authorize(Roles = "3")]
	public class AppointmentController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public AppointmentController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet("myappointments")]
		public async Task<IActionResult> GetMyAppointments()
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı bulunamadı." });
			}

			var userId = int.Parse(userIdClaim.Value);
			var myAppointments = await _context.Appointments
				.Where(a => a.PatientId == userId)
				.Include(a => a.Doctor) 
				.Include(a => a.Patient) 
				.OrderBy(a => a.DateTime) 
				.ToListAsync();

			if (myAppointments == null || !myAppointments.Any())
			{
				return NotFound(new { message = "Randevu bulunamadı." });
			}

			// Döndürülecek veriyi oluşturuyoruz
			var appointmentData = myAppointments.Select(appointment => new
			{
				appointment.AppointmentId,
				AppointmentDate = appointment.DateTime.ToString("yyyy-MM-dd"),
				AppointmentTime = appointment.DateTime.ToString("HH:mm"),
				DoctorName = $"{appointment.Doctor?.Name} {appointment.Doctor?.Surname}",
				PatientName = appointment.Patient?.Name
			}).ToList();

			return Ok(appointmentData);
		}



		[HttpGet("myappointment/{id}")]
		public async Task<IActionResult> GetAppointmentDetails(int id)
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
			}

			var userId = int.Parse(userIdClaim.Value);

			var appointment = await _context.Appointments
				.FirstOrDefaultAsync(a => a.AppointmentId == id && a.PatientId == userId);

			if (appointment == null)
			{
				return NotFound(new { message = "Randevu bulunamadı." });
			}

			return Ok(appointment);
		}

        [HttpGet("doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _context.Users
                .Where(u => u.RoleId == 2) 
                .Select(d => new
                {
                    d.UserId,
                    d.Name,
					d.Surname
                })
                .ToListAsync();

            return Ok(doctors);
        }

        [HttpPost("create")]
		public async Task<IActionResult> CreateAppointment([FromBody] Appointment newAppointment)
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
			}

			var userId = int.Parse(userIdClaim.Value);

			newAppointment.PatientId = userId;

			var doctor = await _context.Users.FindAsync(newAppointment.DoctorId);
			var patient = await _context.Users.FindAsync(newAppointment.PatientId);

			if (doctor == null || patient == null)
			{
				return BadRequest(new { message = "Doktor veya Hasta bulunamadı." });
			}

			newAppointment.Doctor = doctor;
			newAppointment.Patient = patient;

			var existingAppointment = await _context.Appointments
		.FirstOrDefaultAsync(a => a.DoctorId == newAppointment.DoctorId &&
								  a.DateTime == newAppointment.DateTime
								  );

			if (existingAppointment != null)
			{
				return BadRequest(new { message = "Bu saatte doktorun başka bir randevusu var." });
			}

			await _context.Appointments.AddAsync(newAppointment);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Randevu başarıyla oluşturuldu." });
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAppointment(int id)
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
			}

			var userId = int.Parse(userIdClaim.Value);

			var appointment = await _context.Appointments
				.FirstOrDefaultAsync(a => a.AppointmentId == id && a.PatientId == userId);

			if (appointment == null)
			{
				return NotFound(new { message = "Randevu bulunamadı." });
			}

			_context.Appointments.Remove(appointment);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Randevu başarıyla silindi." });
		}


	}
}
