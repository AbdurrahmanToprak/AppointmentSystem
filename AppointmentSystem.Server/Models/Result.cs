using System.Numerics;

namespace AppointmentSystem.Server.Models
{
    public class Result
    {
        public int ResultId { get; set; }
        public string? Message { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
		public int AppointmentId { get; set; }
		public DateTime CreatedDate { get; set; } = DateTime.Now;
	}
}
