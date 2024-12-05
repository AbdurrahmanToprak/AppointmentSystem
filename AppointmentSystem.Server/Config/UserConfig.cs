using AppointmentSystem.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AppointmentSystem.Server.Config
{
	public class UserConfig : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.HasData(
				new User() { UserId = 1, Name = "Dr. Ahmet", Surname = "Yılmaz", Email = "Ahmet@gmail.com", Password = "Ahmet.12", ImageUrl = "", RoleId = 2 },
				new User() { UserId = 2, Name = "Dr. Mehmet", Surname = "Dinçer", Email = "Mehmet@gmail.com", Password = "Mehmet.12", ImageUrl = "", RoleId = 2 },
				new User() { UserId = 3, Name = "Dr. Ali", Surname = "Akın", Email = "Ali@gmail.com", Password = "Ali.12", ImageUrl = "", RoleId = 2 },
				new User() { UserId = 4, Name = "Dr. Abdurrahman", Surname = "Orman", Email = "Abdurrahman@gmail.com", Password = "Abdurrahman.12", ImageUrl = "", RoleId = 2 },
				new User() { UserId = 5, Name = "Dr. Enes", Surname = "Altın", Email = "Enes@gmail.com", Password = "Enes.12", ImageUrl = "", RoleId = 2 },
				new User() { UserId = 6, Name = "Yusuf", Surname = "Bozkurt", Email = "Yusuf@gmail.com", Password = "Yusuf.12", ImageUrl = "", RoleId = 3 },
				new User() { UserId = 7, Name = "Tahir", Surname = "Orman", Email = "Tahir@gmail.com", Password = "Ahmet.12", ImageUrl = "", RoleId = 3 },
				new User() { UserId = 8, Name = "Admin", Surname = "Admin", Email = "Admin@gmail.com", Password = "Admin.12", ImageUrl = "", RoleId = 1 }

						);
		}
	}
}
