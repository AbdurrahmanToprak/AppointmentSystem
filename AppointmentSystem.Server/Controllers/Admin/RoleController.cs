using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/role")]
    public class RoleController : Controller
    {
        private readonly ApplicationDbContext _context;
        public RoleController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetRoles()
        {
            var roles = _context.Roles.ToList();
            if (roles.Any())
            {
                return Ok(roles);
            }
            return Ok(new { message = "Veri Yok." });
        }
        [HttpPost]
        public IActionResult CreateRole(Role role)
        {
            if (role == null)
            {
                return BadRequest(new { message = "Geçersiz veri." });
            }
            _context.Roles.Add(role);
            _context.SaveChanges();
            return Ok(new { message = "Rol Başarıyla Eklendi." });
        }
        [HttpPut("{id}")]
        public IActionResult EditRole(int id, Role role)
        {
            var existRole = _context.Roles.FirstOrDefault(x => x.RoleId == id);
            if (existRole == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }
            existRole.RoleName = role.RoleName;
            _context.SaveChanges();
            return Ok(new { message = "Rol Başarıyla Güncellendi.", existRole });
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteRole(int id)
        {
            var existRole = _context.Roles.FirstOrDefault(x => x.RoleId == id);
            if (existRole == null)
            {
                return NotFound(new { message = "Veri Bulunamadı." });
            }
            _context.Remove(existRole);
            _context.SaveChanges();
            return Ok(new { message = "Rol Başarıyla Silindi." });
        }
    }
}
