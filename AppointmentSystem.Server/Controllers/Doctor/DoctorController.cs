using AppointmentSystem.Server.Data;
using Microsoft.AspNetCore.Mvc;

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

		

	
	}
}
