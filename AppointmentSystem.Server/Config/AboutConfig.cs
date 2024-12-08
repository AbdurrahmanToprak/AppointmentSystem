using AppointmentSystem.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AppointmentSystem.Server.Config
{
	public class AboutConfig : IEntityTypeConfiguration<About>
	{
		public void Configure(EntityTypeBuilder<About> builder)
		{
			builder.HasData(
					new About() {AboutId=1,Title="Hakkımızda", Content= "addasdasdasdsadasdasd",ImageUrl="" }
						);
		}
	}
}
