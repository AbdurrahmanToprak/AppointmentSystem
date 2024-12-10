using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/about")]
    [Authorize(Roles = "1")]
    public class AboutController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public AboutController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAbouts()
        {
            var abouts = await _context.Abouts.ToListAsync();
            if (abouts.Any())
            {
                return Ok(abouts);
            }
            return NotFound(new { message = "Veri bulunamadı" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAbout(int id)
        {
            var about = await _context.Abouts.FirstOrDefaultAsync(x => x.AboutId == id);
            if (about == null)
                return NotFound(new { message = "Geçersiz veri" });
            return Ok(about);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAbout([FromForm] About about, IFormFile? file)
        {
            if (about == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var directoryPath = Path.Combine(_environment.WebRootPath, "image", "about");
            var savePath = Path.Combine(directoryPath, fileName);

            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            about.ImageUrl = $"/image/about/{fileName}";

            await _context.Abouts.AddAsync(about);
            await _context.SaveChangesAsync();

            return Ok(new { message = "About başarıyla eklendi." });
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> EditAbout(int id, [FromForm] About about, IFormFile? file)
        {
            var existAbout = await _context.Abouts.FirstOrDefaultAsync(x => x.AboutId == id);
            if (existAbout == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }

            existAbout.Title = about.Title;
            existAbout.Content = about.Content;

            if (file != null)
            {
                if (!string.IsNullOrEmpty(existAbout.ImageUrl))
                {
                    var oldPath = Path.Combine(_environment.WebRootPath, existAbout.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(oldPath))
                    {
                        System.IO.File.Delete(oldPath);
                    }
                }

                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var savePath = Path.Combine(_environment.WebRootPath, "image", "about", fileName);
                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                existAbout.ImageUrl = $"/image/about/{fileName}";
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "About Başarıyla Güncellendi.", existAbout });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAbout(int id)
        {
            var existAbout = await _context.Abouts.FirstOrDefaultAsync(x => x.AboutId == id);
            if (existAbout == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }

            if (!string.IsNullOrEmpty(existAbout.ImageUrl))
            {
                var oldPath = Path.Combine(_environment.WebRootPath, existAbout.ImageUrl.TrimStart('/'));
                if (System.IO.File.Exists(oldPath))
                {
                    System.IO.File.Delete(oldPath);
                }
            }

            _context.Abouts.Remove(existAbout);
            await _context.SaveChangesAsync();

            return Ok(new { message = "About Başarıyla Silindi." });
        }
    }
}
