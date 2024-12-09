using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers.Patient
{
    [Route("api/patient/profile")]
    [ApiController]
    [Authorize(Roles = "3")]
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
                .Include(x => x.Role)
                .FirstOrDefaultAsync();

            if (profile == null)
                return NotFound(new { message = "Veri bulunamadı" });

            return Ok(profile);
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile(User updatedProfile)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            var userId = int.Parse(userIdClaim.Value);

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
        public async Task<IActionResult> DeleteProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
            }

            var userId = int.Parse(userIdClaim.Value);

            var existProfile = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (existProfile == null)
            {
                return NotFound(new { message = "Profil bulunamadı." });
            }
            _context.Users.Remove(existProfile);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Profil başarıyla silindi." });
        }
    }
}
