using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AppointmentSystem.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : Controller
	{
		private readonly ApplicationDbContext _context;
		private readonly IConfiguration _configuration;

		public AuthController(ApplicationDbContext context, IConfiguration configuration)
		{
			_context = context;
			_configuration = configuration;
		}

		[HttpPost("register")]
		public IActionResult Register([FromBody] User newUser)
		{
			if (_context.Users.Any(u => u.Email == newUser.Email))
			{
				return Conflict("Bu e-posta adresi zaten kayıtlı.");
			}

			_context.Users.Add(newUser);
			_context.SaveChanges();

			return Ok("Kullanıcı başarıyla kaydedildi.");
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] User loginRequest)
		{
			var user = await _context.Users
				.FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

			if (user == null)
			{
				return Unauthorized("Geçersiz kullanıcı adı veya şifre.");
			}

			// JWT oluşturma
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[]
				{
					new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
					new Claim(ClaimTypes.Email, user.Email ?? "Unkown Email"),
					new Claim(ClaimTypes.Role, user.Role?.RoleName ?? "User"),
				}),
				Expires = DateTime.UtcNow.AddMinutes(20),
				Issuer = _configuration["Jwt:Issuer"],
				Audience = _configuration["Jwt:Audience"],
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			var tokenString = tokenHandler.WriteToken(token);

			return Ok(new { Token = tokenString });
		}
	}
}
