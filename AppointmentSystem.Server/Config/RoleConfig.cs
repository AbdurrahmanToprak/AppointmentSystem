using AppointmentSystem.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AppointmentSystem.Server.Config
{
	public class RoleConfig : IEntityTypeConfiguration<Role>
	{
		public void Configure(EntityTypeBuilder<Role> builder)
		{
			builder.HasData(
					new Role() { RoleId = 1, RoleName= "Admin" },
					new Role() { RoleId = 2, RoleName = "Doctor" },
					new Role() { RoleId = 3, RoleName = "User" }
						);
		}
	}
}
