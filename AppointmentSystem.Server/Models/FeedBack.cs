namespace AppointmentSystem.Server.Models
{
    public class FeedBack
    {
        public int FeedBackId { get; set; }
        public string? Comment { get; set; }
        public int point {  get; set; }
        public int PatientId { get; set; }
    }
}
