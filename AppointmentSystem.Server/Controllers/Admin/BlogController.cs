using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/blog")]
    [Authorize(Roles = "1")]
    public class BlogController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public BlogController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await _context.Blogs.ToListAsync();
            if (blogs.Any())
            {
                return Ok(blogs);
            }
            return NotFound(new { message = "Veri bulunamadı" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlog(int id)
        {
            var blog = await _context.Blogs.FirstOrDefaultAsync(x => x.BlogId == id);
            if (blog == null)
                return NotFound(new { message = "Geçersiz veri" });
            return Ok(blog);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromForm] Blog blog, IFormFile? file)
        {
            if (blog == null || file == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var directoryPath = Path.Combine(_environment.WebRootPath, "image", "blog");
            var savePath = Path.Combine(directoryPath, fileName);

            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            blog.ImageUrl = $"/image/blog/{fileName}";

            await _context.Blogs.AddAsync(blog);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Blog başarıyla eklendi." });
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> EditBlog(int id, [FromForm] Blog blog, IFormFile? file)
        {
            var existBlog = await _context.Blogs.FirstOrDefaultAsync(x => x.BlogId == id);
            if (existBlog == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }

            existBlog.Title = blog.Title;
            existBlog.Content = blog.Content;

            if (file != null)
            {
                if (!string.IsNullOrEmpty(existBlog.ImageUrl))
                {
                    var oldPath = Path.Combine(_environment.WebRootPath, existBlog.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(oldPath))
                    {
                        System.IO.File.Delete(oldPath);
                    }
                }

                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var savePath = Path.Combine(_environment.WebRootPath, "image", "blog", fileName);
                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                existBlog.ImageUrl = $"/image/blog/{fileName}";
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Blog Başarıyla Güncellendi.", existBlog });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var existBlog = await _context.Blogs.FirstOrDefaultAsync(x => x.BlogId == id);
            if (existBlog == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }

            if (!string.IsNullOrEmpty(existBlog.ImageUrl))
            {
                var oldPath = Path.Combine(_environment.WebRootPath, existBlog.ImageUrl.TrimStart('/'));
                if (System.IO.File.Exists(oldPath))
                {
                    System.IO.File.Delete(oldPath);
                }
            }

            _context.Blogs.Remove(existBlog);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Blog Başarıyla Silindi." });
        }
    }
}
