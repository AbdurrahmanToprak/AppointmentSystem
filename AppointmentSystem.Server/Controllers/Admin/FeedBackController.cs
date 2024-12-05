using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/feedback")]
    public class FeedBackController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FeedBackController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetFeedBacks()
        {
            var feedbacks = _context.FeedBacks.ToList();
            if (feedbacks.Any())
            {
                return Ok(feedbacks);
            }
            return NotFound(new {message = "Veri bulunamadı."});
        }
        [HttpPut("{id}")]
        public IActionResult UpdateStatusFeedBack(int id,FeedBack feedBack)
        {
            var existFeedback = _context.FeedBacks.FirstOrDefault(x=>x.FeedBackId == id);
            if (existFeedback == null)
            {
                return BadRequest(new {message = "Geçersiz veri."});
            }
            existFeedback.Status = feedBack.Status;
            _context.SaveChanges();
            return Ok(new { message = "Yorum durumu başarıyla güncellendi." });
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteFeedBack(int id)
        {
            var existFeedback = _context.FeedBacks.FirstOrDefault(x => x.FeedBackId == id);
            if (existFeedback == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }
            _context.Remove(existFeedback);
            _context.SaveChanges();
            return Ok(new { message = "Yorum başarıyla silindi." });
        }
    }
}
