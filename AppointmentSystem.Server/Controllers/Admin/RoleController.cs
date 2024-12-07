using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/role")]
    [Authorize(Roles = "1")]
    public class RoleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RoleController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _context.Roles.ToListAsync();
            if (roles.Any())
            {
                return Ok(roles);
            }
            return Ok(new { message = "Veri Yok." });
        }
        [HttpPost]
        public async Task<IActionResult> CreateRole(Role role)
        {
            if (role == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }
            await _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Rol Başarıyla Eklendi." });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditRole(int id, Role role)
        {
            var existRole = await _context.Roles.FirstOrDefaultAsync(x => x.RoleId == id);
            if (existRole == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }
            existRole.RoleName = role.RoleName;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Rol Başarıyla Güncellendi.", existRole });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var existRole = await _context.Roles.FirstOrDefaultAsync(x => x.RoleId == id);
            if (existRole == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }
            _context.Roles.Remove(existRole);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Rol Başarıyla Silindi." });
        }
    }
}
