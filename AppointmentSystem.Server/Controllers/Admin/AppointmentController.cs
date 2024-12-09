using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace AppointmentSystem.Server.Controllers
{
    [ApiController]
    [Route("api/admin/appointment")]
    [Authorize(Roles = "1")]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAppointments()
        {
            var appointments = await _context.Appointments
                .Include(x => x.Doctor)
                .Include(x => x.Patient)
                .Select(a => new
                  {
                      a.AppointmentId,
                      a.DateTime,
                      a.Time,
                      a.Status,
                      a.PatientId,
                      a.CreatedDate,
                      PatientName = a.Patient.Name + " " + a.Patient.Surname,
                      DoctorName = a.Doctor.Name + " " + a.Doctor.Surname
                  })
                .ToListAsync();

            if (appointments.Any())
            {
                return Ok(appointments);
            }

            return NotFound(new { message = "Randevu bulunamadı." });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointment(int id)
        {
            var appointment = await _context.Appointments
                .Include(x => x.Doctor)
                .Include(x => x.Patient)
                .FirstOrDefaultAsync(x => x.AppointmentId == id);

            if (appointment == null)
            {
                return NotFound(new { message = "Randevu bulunamadı." });
            }

            return Ok(appointment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
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
