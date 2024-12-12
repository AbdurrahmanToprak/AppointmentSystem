using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppointmentSystem.Server.Controllers.Doctor
{
	[Route("api/doctor/profiles")]
	[ApiController]
	[Authorize(Roles = "2")] // Doktor rolü için yetkilendirme
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

			var profile = await _context.Users.Where(x => x.UserId == userId && x.RoleId == 2) // Doktor kontrolü
				.Include(x => x.Role)
				.FirstOrDefaultAsync();

			if (profile == null)
				return NotFound(new { message = "Profil bulunamadı." });

			// Eğer profil fotoğrafı varsa ve bir yol (URL) yoksa, onu ekleyin
			if (!string.IsNullOrEmpty(profile.ImageUrl))
			{
				profile.ImageUrl = $"https://localhost:7200{profile.ImageUrl}"; // Eğer `ImageUrl` veritabanında sadece "/uploads/...jpg" gibi bir yol döndürüyorsa
			}

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

			var existProfile = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId && x.RoleId == 2);

			if (existProfile == null)
				return NotFound(new { message = "Profil bulunamadı." });

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

			var existProfile = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId && x.RoleId == 2);
			if (existProfile == null)
			{
				return NotFound(new { message = "Profil bulunamadı." });
			}
			_context.Users.Remove(existProfile);
			await _context.SaveChangesAsync();
			return Ok(new { message = "Profil başarıyla silindi." });
		}

		[HttpPost("upload-image")]
		public async Task<IActionResult> UploadImage(IFormFile image)
		{
			if (image == null || image.Length == 0)
				return BadRequest(new { message = "Geçerli bir fotoğraf yükleyin." });

			var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", image.FileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await image.CopyToAsync(stream);
			}

			// Fotoğrafın URL'sini döndürebilirsiniz
			var imageUrl = $"https://localhost:7200/images/{image.FileName}";

			// URL'i veritabanına kaydetmek isterseniz, burada kullanıcı profilini güncelleyebilirsiniz
			var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
			var userId = int.Parse(userIdClaim.Value);
			var user = await _context.Users.FindAsync(userId);

			if (user != null)
			{
				user.ImageUrl = imageUrl;
				_context.Users.Update(user);
				await _context.SaveChangesAsync();
			}

			return Ok(new { imageUrl });
		}


	}
}
