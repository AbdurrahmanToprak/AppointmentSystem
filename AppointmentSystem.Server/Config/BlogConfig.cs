using AppointmentSystem.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AppointmentSystem.Server.Config
{
	public class BlogConfig : IEntityTypeConfiguration<Blog>
	{
		public void Configure(EntityTypeBuilder<Blog> builder)
		{
			builder.HasData(
					new Blog() { BlogId=1, Title="dadsdada",Content="adasdad", ImageUrl="" },
					new Blog() { BlogId = 2, Title = "dadsdada", Content = "adasdad", ImageUrl = "" },
					new Blog() { BlogId = 3, Title = "dadsdada", Content = "adasdad", ImageUrl = "" }
						);
		}
	}
}
