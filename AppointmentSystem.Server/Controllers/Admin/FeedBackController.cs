using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/feedback")]
    public class FeedBackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedBackController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetFeedBacks()
        {
            var feedbacks = await _context.FeedBacks.ToListAsync();
            if (feedbacks.Any())
            {
                return Ok(feedbacks);
            }
            return NotFound(new {message = "Veri bulunamadı."});
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatusFeedBack(int id,FeedBack feedBack)
        {
            var existFeedback = await _context.FeedBacks.FirstOrDefaultAsync(x=>x.FeedBackId == id);
            if (existFeedback == null)
            {
                return BadRequest(new {message = "Geçersiz veri."});
            }
            existFeedback.Status = feedBack.Status;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Yorum durumu başarıyla güncellendi." });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedBack(int id)
        {
            var existFeedback = await _context.FeedBacks.FirstOrDefaultAsync(x => x.FeedBackId == id);
            if (existFeedback == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }
            _context.FeedBacks.Remove(existFeedback);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Yorum başarıyla silindi." });
        }
    }
}
