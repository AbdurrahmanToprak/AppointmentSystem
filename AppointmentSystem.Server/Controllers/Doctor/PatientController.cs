using Microsoft.AspNetCore.Mvc;
using AppointmentSystem.Server.Models;
using Microsoft.EntityFrameworkCore;
using AppointmentSystem.Server.Data; 

namespace AppointmentSystem.Server.Controllers.Doctor
{
	[Route("api/doctor/[controller]")]
	[ApiController]
	public class PatientController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public PatientController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetPatients()
		{
			try
			{
				var patients = await _context.Users
					.Where(u => u.RoleId == 3)
					.Select(u => new
					{
						u.UserId,
						u.Name,
						u.Surname,
						u.Email,
						ImageUrl = string.IsNullOrEmpty(u.ImageUrl)
							? null
							: $"https://localhost:7200{u.ImageUrl}" 
					})
					.ToListAsync();

				if (!patients.Any())
				{
					return NotFound("Hasta bulunamadı.");
				}

				return Ok(patients);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Sunucu hatası: {ex.Message}");
			}
		}


	}
}
