using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/about")]
    [Authorize(Roles = "1")]
    public class AboutController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AboutController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            var about = await _context.Abouts.FirstOrDefaultAsync();
            if (about == null)
                return NotFound(new { message = "Veri bulunamadı." });
            return Ok(about);
        }
        [HttpPost]
        public async Task<IActionResult> CreateAbout(About about)
        {
            if (about == null)
                return BadRequest(new { message = "Geçersiz Veri." });
            await _context.Abouts.AddAsync(about);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Hakkımızda bilgisi başarıyla oluşturuldu", about });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAbout(int id, About about)
        {
            var existAbout = await _context.Abouts.FirstOrDefaultAsync(x => x.AboutId == id);
            if (existAbout == null)
                return NotFound(new { message = "Hakkımızda bilgisi bulunamadı." });
            existAbout.Title = about.Title;
            existAbout.Content = about.Content;
            existAbout.ImageUrl = about.ImageUrl;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Hakkımızda bilgisi başarıyla güncellendi.", existAbout });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAbout(int id)
        {
            var existAbout = await _context.Abouts.FirstOrDefaultAsync(x => x.AboutId == id);
            if (existAbout == null)
                return NotFound(new { message = "Hakkımızda bilgisi bulunamadı." });
            _context.Abouts.Remove(existAbout);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Başarıyla silindi." });
        }
    }
}
