using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AppointmentSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class ConfigDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Abouts",
                columns: new[] { "AboutId", "Content", "ImageUrl", "Title" },
                values: new object[] { 1, "addasdasdasdsadasdasd", "", "Hakkımızda" });

            migrationBuilder.InsertData(
                table: "Blogs",
                columns: new[] { "BlogId", "Content", "ImageUrl", "Title" },
                values: new object[,]
                {
                    { 1, "adasdad", "", "dadsdada" },
                    { 2, "adasdad", "", "dadsdada" },
                    { 3, "adasdad", "", "dadsdada" }
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "ContactId", "Address", "Email", "PhoneNumber" },
                values: new object[] { 1, "adsdasd", "a", "87478487" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Abouts",
                keyColumn: "AboutId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Blogs",
                keyColumn: "BlogId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Blogs",
                keyColumn: "BlogId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Blogs",
                keyColumn: "BlogId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "ContactId",
                keyValue: 1);
        }
    }
}
