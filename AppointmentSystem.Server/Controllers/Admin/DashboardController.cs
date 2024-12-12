using AppointmentSystem.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [Route("api/admin/dashboard")]
    [ApiController]
    [Authorize(Roles = "1")]
    public class DashboardController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardStats()
        {

            int totalDoctors = await _context.Users.Where(a=>a.RoleId == 2).CountAsync(); 

            int totalPatients = await _context.Users.Where(a => a.RoleId == 3).CountAsync();

            var today = DateTime.Today;
            int todaysAppointments = await _context.Appointments
                .Where(r => r.DateTime.Date == today)
                .CountAsync(); 

            var dashboardStats = new
            {
                TotalDoctors = totalDoctors,
                TotalPatients = totalPatients,
                TodaysAppointments = todaysAppointments
            };

            return Ok(dashboardStats);
        }
    }
}
