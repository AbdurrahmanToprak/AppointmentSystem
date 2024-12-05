using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/blog")]
    public class BlogController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BlogController(ApplicationDbContext context)
        {
            _context = context;
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
        public async Task<IActionResult> CreateBlog(Blog blog)
        {
            if (blog == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }
            await _context.Blogs.AddAsync(blog);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Blog Başarıyla Eklendi." });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBlog(int id, Blog blog)
        {
            var existBlog = await _context.Blogs.FirstOrDefaultAsync(x => x.BlogId == id);
            if (existBlog == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }
            existBlog.Title = blog.Title;
            existBlog.Content = blog.Content;
            existBlog.ImageUrl = blog.ImageUrl;
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
            _context.Blogs.Remove(existBlog);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Blog Başarıyla Silindi." });
        }
    }
}
