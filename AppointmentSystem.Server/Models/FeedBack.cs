namespace AppointmentSystem.Server.Models
{
    public class FeedBack
    {
        public int FeedBackId { get; set; }
        public string? Comment { get; set; }
        public int Point {  get; set; }
        public int PatientId { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

    }
}
