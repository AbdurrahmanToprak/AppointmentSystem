using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/about")]
    public class AboutController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AboutController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAbout()
        {
            var about = _context.Abouts.FirstOrDefault();
            if (about == null)
                return NotFound(new { message = "Veri bulunamadı." });
            return Ok(about);
        }
        [HttpPost]
        public IActionResult CreateAbout(About about)
        {
            if (about == null)
                return BadRequest(new { message = "Geçersiz Veri." });
            _context.Abouts.Add(about);
            _context.SaveChanges();
            return Ok(new { message = "Hakkımızda bilgisi başarıyla oluşturuldu", about });
        }
        [HttpPut("{id}")]
        public IActionResult UpdateAbout(int id, About about)
        {
            var existAbout = _context.Abouts.FirstOrDefault(x => x.AboutId == id);
            if (existAbout == null)
                return NotFound(new { message = "Hakkımızda bilgisi bulunamadı." });
            existAbout.Title = about.Title;
            existAbout.Content = about.Content;
            existAbout.ImageUrl = about.ImageUrl;
            _context.SaveChanges();
            return Ok(new { message = "Hakkımızda bilgisi başarıyla güncellendi.", existAbout });
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteAbout(int id)
        {
            var existAbout = _context.Abouts.FirstOrDefault(x => x.AboutId == id);
            if (existAbout == null)
                return NotFound(new { message = "Hakkımızda bilgisi bulunamadı." });
            _context.Abouts.Remove(existAbout);
            _context.SaveChanges();
            return Ok(new { message = "Başarıyla silindi." });
        }
    }
}
