using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;

namespace AppointmentSystem.Server.Controllers
{
    [ApiController]
    [Route("api/admin/appointment")]
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
