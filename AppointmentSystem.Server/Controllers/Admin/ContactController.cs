using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSystem.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/contact")]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetContact()
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync();
            if (contact == null)
                return NotFound(new { message = "Veri bulunamadı." });
            return Ok(contact);
        }
        [HttpPost]
        public async Task<IActionResult> CreateContact(Contact contact)
        {
            if (contact == null)
                return BadRequest(new { message = "Geçersiz veri." });
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return Ok(new { message = "İletişim bilgisi başarıyla oluşturuldu.", contact });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, Contact contact)
        {
            var existContact = await _context.Contacts.FirstOrDefaultAsync(x => x.ContactId == id);
            if (existContact == null)
                return NotFound(new { message = "İletişim bilgisi bulunamadı." });
            existContact.Email = contact.Email;
            existContact.PhoneNumber = contact.PhoneNumber;
            existContact.Address = contact.Address;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var existContact = await _context.Contacts.FirstOrDefaultAsync(x => x.ContactId == id);
            if (existContact == null)
                return NotFound(new { message = "İletişim bilgisi bulunamadı." });
            _context.Contacts.Remove(existContact);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Başarıyla silindi." });
        }

    }
}
