using AppointmentSystem.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AppointmentSystem.Server.Config
{
	public class ContactConfig : IEntityTypeConfiguration<Contact>
	{
		public void Configure(EntityTypeBuilder<Contact> builder)
		{
			builder.HasData(
					new Contact() { ContactId=1, Email="a",PhoneNumber="87478487",Address="adsdasd" }
						);
		}
	}
}
