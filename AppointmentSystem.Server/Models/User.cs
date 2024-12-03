namespace AppointmentSystem.Server.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ImageUrl { get; set; }
        public int RoleId { get; set; }

        public Role? Role { get; set; }
    }
}
