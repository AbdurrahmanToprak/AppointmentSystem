using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/user")]
    [Authorize(Roles = "1")]

    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("admins")]
        public async Task<IActionResult> GetAdmins()
        {
            var admins = await _context.Users
                .Where(x => x.RoleId == 1) 
                .Include(x=>x.Role)
                .ToListAsync();

            if (admins.Any())
            {
                return Ok(admins);
            }

            return NotFound(new { message = "Admin bulunamadı." });
        }


        [HttpPost("admins")]
        public async Task<IActionResult> CreateAdmin(User newAdmin)
        {
            if (newAdmin == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }

            newAdmin.RoleId = 1;

            await  _context.Users.AddAsync(newAdmin);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Admin başarıyla eklendi.", newAdmin });
        }

        [HttpPut("admins/{id}")]
        public async Task<IActionResult> UpdateAdmin(int id,User updatedAdmin)
        {
            var existAdmin = await _context.Users.FirstOrDefaultAsync(x => x.UserId == id);
            if (existAdmin == null)
            {
                return NotFound(new { message = "Admin bulunamadı." });
            }

            existAdmin.Name = updatedAdmin.Name;
            existAdmin.Surname = updatedAdmin.Surname;
            existAdmin.Email = updatedAdmin.Email;
            existAdmin.Password = updatedAdmin.Password;

            _context.Users.Update(existAdmin);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Admin başarıyla güncellendi.", existAdmin });
        }

    
        [HttpDelete("admins/{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var existAdmin = await _context.Users.FirstOrDefaultAsync(x => x.UserId == id);
            if (existAdmin == null)
            {
                return NotFound(new { message = "Admin bulunamadı." });
            }

            // Son Admini Silmeye İzin Verme (daha sonrasında login olan adminin silinmesi engellenecek)
            var adminCount = await _context.Users.CountAsync(x => x.RoleId == 1);
            if (adminCount == 1)
            {
                return BadRequest(new { message = "Son admini silemezsiniz." });
            }

            _context.Users.Remove(existAdmin);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Admin başarıyla silindi." });
        }

        [HttpGet("doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _context.Users
                .Where(x => x.RoleId == 2)
                .Include(x => x.Role)
                .ToListAsync();

            if (doctors.Any())
            {
                return Ok(doctors);
            }

            return NotFound(new { message = "Doktor bulunamadı." });
        }

        [HttpDelete("doctors/{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var existDoctor = await _context.Users.FirstOrDefaultAsync(x => x.UserId == id && x.RoleId == 2);
            if (existDoctor == null)
            {
                return NotFound(new { message = "Doktor bulunamadı." });
            }
            var doctorAppointments = _context.Appointments
            .Where(a => a.DoctorId == id)
            .ToList();

            if (doctorAppointments.Any())
            {
                return BadRequest(new { message = "Bu doktor, aktif randevulara sahip olduğu için silinemez." });
            }

            _context.Users.Remove(existDoctor);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Doktor başarıyla silindi." });
        }

        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            var patients = await _context.Users
                .Where(x => x.RoleId == 3)
                .Include(x => x.Role)
                .ToListAsync();

            if (patients.Any())
            {
                return Ok(patients);
            }

            return NotFound(new { message = "Hasta bulunamadı." });
        }

        [HttpGet("patients/{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {

            var patient = await _context.Users
                .Where(x => x.RoleId == 3 && x.UserId == id)
                .Include(x => x.Role)
                .FirstOrDefaultAsync();

            if (patient == null)
            {
                return NotFound(new { message = "Hasta bulunamadı." });
            }


            return Ok(new
            {
                Id = patient.UserId,
                Name = patient.Name,
                Surname = patient.Surname,
                Email = patient.Email,
                Role = patient.Role?.RoleName ?? "Belirtilmemiş",
            });
        }

        [HttpDelete("patients/{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var existPatient = await _context.Users.FirstOrDefaultAsync(x => x.UserId == id && x.RoleId == 3);
            if (existPatient == null)
            {
                return NotFound(new { message = "Hasta bulunamadı." });
            }
            var patientAppointments = _context.Appointments
            .Where(a => a.PatientId == id)
            .ToList();

            if (patientAppointments.Any())
            {
                return BadRequest(new { message = "Bu hasta, aktif randevulara sahip olduğu için silinemez." });
            }

            _context.Users.Remove(existPatient);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Hasta başarıyla silindi." });
        }
    }
}
