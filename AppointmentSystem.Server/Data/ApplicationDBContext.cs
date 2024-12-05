using Microsoft.EntityFrameworkCore;
using AppointmentSystem.Server.Models;
using AppointmentSystem.Server.Config;

namespace AppointmentSystem.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<About> Abouts { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<FeedBack> FeedBacks { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany()
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Appointment>()
               .HasOne(a => a.Patient)
               .WithMany()
               .HasForeignKey(a => a.PatientId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasOne<Role>(u => u.Role)
                .WithMany()
                .HasForeignKey(u => u.RoleId);

            modelBuilder.ApplyConfiguration(new RoleConfig());
			modelBuilder.ApplyConfiguration(new UserConfig());
		}
    }
}
