﻿using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers.Patient
{
    [Route("api/patient/appointment")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentController(ApplicationDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet("myappointments")]
        public async Task<IActionResult> GetMyAppointments()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            var userId = int.Parse(userIdClaim.Value);
         
            var myAppointments = await _context.Appointments
                .Where(a => a.PatientId == userId) 
                .OrderBy(a => a.DateTime) 
                .ToListAsync();
            if (myAppointments == null)
                return NotFound(new { message = "Veri Bulunamadı" });

            return Ok(myAppointments); 
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
        [Authorize]
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

            _context.Appointments.Add(newAppointment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Randevu başarıyla oluşturuldu." });
        }
        [Authorize]
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

            return Ok(new {message = "Randevu başarıyla silindi."});
        }


    }
}