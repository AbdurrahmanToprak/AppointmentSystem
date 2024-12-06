using AppointmentSystem.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("about")]
        public async Task<IActionResult> GetAbout()
        {
            var about = await _context.Abouts.FirstOrDefaultAsync();
            if (about == null)
                return NotFound(new { message = "Veri bulunamadı." });
            return Ok(about);
        }

        [HttpGet("blogs")]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await _context.Blogs.ToListAsync();
            if (blogs.Any())
            {
                return Ok(blogs);
            }
            return NotFound(new { message = "Veri bulunamadı" });
        }

        [HttpGet("blog/{id}")]
        public async Task<IActionResult> GetBlog(int id)
        {
            var blog = await _context.Blogs.FirstOrDefaultAsync(x => x.BlogId == id);
            if (blog == null)
                return NotFound(new { message = "Geçersiz veri" });
            return Ok(blog);
        }

        [HttpGet("doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _context.Users
                .Where(x => x.RoleId == 2)
                .ToListAsync();

            if (doctors.Any())
            {
                return Ok(doctors);
            }

            return NotFound(new { message = "Doktor bulunamadı." });
        }

        [HttpGet("feedbacks")]
        public async Task<IActionResult> GetFeedBacks()
        {
            var feedbacks = await _context.FeedBacks.Where(x=>x.Status == true).ToListAsync();
            if (feedbacks.Any())
            {
                return Ok(feedbacks);
            }
            return NotFound(new { message = "Veri bulunamadı." });
        }

        [HttpGet("contact")]
        public async Task<IActionResult> GetContact()
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync();
            if (contact == null)
                return NotFound(new { message = "Veri bulunamadı." });
            return Ok(contact);
        }
    }
}
