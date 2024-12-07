using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [Route("api/admin/profile")]
    [ApiController]
    [Authorize(Roles = "1")]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            var userId = int.Parse(userIdClaim.Value);

            var profile = await _context.Users.Where(x => x.UserId == userId)
                .Include(x=>x.Role)
                .FirstOrDefaultAsync();

            if (profile == null)
                return NotFound(new { message = "Veri bulunamadı" });

            return Ok(profile);
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile(int userId, User updatedProfile)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            userId = int.Parse(userIdClaim.Value);

            var existProfile = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);

            if (existProfile == null)
                return NotFound(new { message = "Veri bulunamadı." });

            existProfile.Name = updatedProfile.Name;
            existProfile.Surname = updatedProfile.Surname;
            existProfile.Email = updatedProfile.Email;
            existProfile.Password = updatedProfile.Password;
            existProfile.ImageUrl = updatedProfile.ImageUrl;

            _context.Users.Update(existProfile);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Profil başarıyla güncellendi.", existProfile });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProfile(int userId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            userId = int.Parse(userIdClaim.Value);

            var existProfile = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (existProfile == null)
            {
                return NotFound(new { message = "Profil bulunamadı." });
            }

            // Son Admini Silmeye İzin Verme 
            var adminCount = await _context.Users.CountAsync(x => x.RoleId == 1);
            if (adminCount == 1)
            {
                return BadRequest(new { message = "Son admini silemezsiniz." });
            }

            _context.Users.Remove(existProfile);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Profil başarıyla silindi." });
        }
    }
}
