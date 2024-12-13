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
		private readonly IWebHostEnvironment _environment;

		public ProfileController(ApplicationDbContext context, IWebHostEnvironment environment)
		{
			_context = context;
			_environment = environment;
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
			if (!string.IsNullOrEmpty(profile.ImageUrl))
			{
				profile.ImageUrl = $"https://localhost:7200{profile.ImageUrl}";
			}

			return Ok(profile);
        }

		[HttpPut]
		public async Task<IActionResult> EditProfile([FromForm] User updatedProfile, IFormFile? file)
		{
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
			if (userIdClaim == null)
			{
				return Unauthorized(new { message = "Kullanıcı kimliği doğrulanamadı." });
			}

			var userId = int.Parse(userIdClaim.Value);

			var existProfile = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
			if (existProfile == null)
				return NotFound(new { message = "Profil bulunamadı." });

			existProfile.Name = updatedProfile.Name;
			existProfile.Surname = updatedProfile.Surname;
			existProfile.Email = updatedProfile.Email;
			existProfile.Password = updatedProfile.Password;

			if (file != null)
			{
				if (!string.IsNullOrEmpty(existProfile.ImageUrl))
				{
					var oldPath = Path.Combine(_environment.WebRootPath, existProfile.ImageUrl.TrimStart('/'));
					if (System.IO.File.Exists(oldPath))
					{
						System.IO.File.Delete(oldPath);
					}
				}

				var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
				var savePath = Path.Combine(_environment.WebRootPath, "image", "user", fileName);
				using (var stream = new FileStream(savePath, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}

				existProfile.ImageUrl = $"/image/user/{fileName}";
			}

			_context.Users.Update(existProfile);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Profil başarıyla güncellendi.", existProfile });
		}

		[HttpDelete]
		public async Task<IActionResult> DeleteProfile(int userId, string deleteType)
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

			if (deleteType == "profilePhoto")
			{
				if (!string.IsNullOrEmpty(existProfile.ImageUrl))
				{
					var oldPath = Path.Combine(_environment.WebRootPath, existProfile.ImageUrl.TrimStart('/'));
					if (System.IO.File.Exists(oldPath))
					{
						System.IO.File.Delete(oldPath);
					}
					existProfile.ImageUrl = null;
					_context.Users.Update(existProfile);
					await _context.SaveChangesAsync();
					return Ok(new { message = "Profil fotoğrafı başarıyla silindi." });
				}

				return BadRequest(new { message = "Silinecek profil fotoğrafı bulunamadı." });
			}
			else if (deleteType == "account")
			{

				if (!string.IsNullOrEmpty(existProfile.ImageUrl))
				{
					var oldPath = Path.Combine(_environment.WebRootPath, existProfile.ImageUrl.TrimStart('/'));
					if (System.IO.File.Exists(oldPath))
					{
						System.IO.File.Delete(oldPath);
					}
				}

				_context.Users.Remove(existProfile);
				await _context.SaveChangesAsync();
				return Ok(new { message = "Profil başarıyla silindi." });
			}

			return BadRequest(new { message = "Geçersiz işlem türü." });
		}
	}
}
