using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers.Patient
{
    [Route("api/patient/feedback")]
    [ApiController]
    [Authorize(Roles = "3")]
    public class FeedBackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedBackController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("myfeedbacks")]
        public async Task<IActionResult> GetMyFeedBacks()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı bulunamadı." });
            }
            var userId = int.Parse(userIdClaim.Value);

            var myFeedBacks = await _context.FeedBacks
                .Where(a => a.PatientId == userId)
                .OrderBy(a => a.CreatedDate)
                .ToListAsync();
            if (myFeedBacks == null)
                return NotFound(new { message = "Veri Bulunamadı" });

            return Ok(myFeedBacks);
        }
        [HttpGet("myfeedback/{id}")]
        public async Task<IActionResult> GetMyFeedBack(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı bulunamadı." });
            }
            var userId = int.Parse(userIdClaim.Value);

            var feedback = await _context.FeedBacks
                .FirstOrDefaultAsync(a => a.FeedBackId == id && a.PatientId == userId);

            if (feedback == null)
            {
                return NotFound(new { message = "Yorum bulunamadı." });
            }
            return Ok(feedback);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateFeedBack([FromBody] FeedBack newFeedBack)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            var userId = int.Parse(userIdClaim.Value);

            newFeedBack.PatientId = userId;


            _context.FeedBacks.Add(newFeedBack);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Yorum başarıyla oluşturuldu." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedBack(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            var userId = int.Parse(userIdClaim.Value);

            var feedback = await _context.FeedBacks
                .FirstOrDefaultAsync(a => a.FeedBackId == id && a.PatientId == userId);

            if (feedback == null)
            {
                return NotFound(new { message = "Yorum bulunamadı." });
            }

            _context.FeedBacks.Remove(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Yorum başarıyla silindi." });
        }
    }    
}
