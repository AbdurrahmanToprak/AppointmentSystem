using AppointmentSystem.Server.Data;
using AppointmentSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSystem.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetContact()
        {
            var contact = _context.Contacts.FirstOrDefault();
            if (contact == null)
                return NotFound(new { message = "Veri bulunamadı." });
            return Ok(contact);
        }
        [HttpPost]
        public IActionResult CreateContact(Contact contact)
        {
            if (contact == null)
                return BadRequest(new { message = "Geçersiz veri." });
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return Ok(new { message = "İletişim bilgisi başarıyla oluşturuldu.", contact });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateContact(int id, Contact contact)
        {
            var existContact = _context.Contacts.FirstOrDefault(x => x.ContactId == id);
            if (existContact == null)
                return NotFound(new { message = "İletişim bilgisi bulunamadı." });
            existContact.Email = contact.Email;
            existContact.PhoneNumber = contact.PhoneNumber;
            existContact.Address = contact.Address;

            _context.SaveChanges();
            return Ok(new { message = "Başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var existContact = _context.Contacts.FirstOrDefault(x=>x.ContactId == id);
            if (existContact == null)
                return NotFound(new { message = "İletişim bilgisi bulunamadı." });
            _context.Contacts.Remove(existContact);
            _context.SaveChanges();
            return Ok(new { message = "Başarıyla silindi." });
        }

    }
}
