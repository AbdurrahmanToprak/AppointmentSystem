using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentSystem.Server.Models
{

    public class Appointment
    {
        public int AppointmentId { get; set; }
        public TimeSpan Time { get; set; }
        public DateTime DateTime { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int DoctorId { get; set; }
        public int PatientId { get; set; }

        public User? Doctor { get; set; } 
        public User? Patient { get; set; }
    }
}
