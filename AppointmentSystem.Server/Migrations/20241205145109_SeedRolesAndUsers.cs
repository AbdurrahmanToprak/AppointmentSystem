using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AppointmentSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedRolesAndUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "Doctor" },
                    { 3, "User" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "ImageUrl", "Name", "Password", "RoleId", "Surname" },
                values: new object[,]
                {
                    { 1, "Ahmet@gmail.com", "", "Dr. Ahmet", "Ahmet.12", 2, "Yılmaz" },
                    { 2, "Mehmet@gmail.com", "", "Dr. Mehmet", "Mehmet.12", 2, "Dinçer" },
                    { 3, "Ali@gmail.com", "", "Dr. Ali", "Ali.12", 2, "Akın" },
                    { 4, "Abdurrahman@gmail.com", "", "Dr. Abdurrahman", "Abdurrahman.12", 2, "Orman" },
                    { 5, "Enes@gmail.com", "", "Dr. Enes", "Enes.12", 2, "Altın" },
                    { 6, "Yusuf@gmail.com", "", "Yusuf", "Yusuf.12", 3, "Bozkurt" },
                    { 7, "Tahir@gmail.com", "", "Tahir", "Ahmet.12", 3, "Orman" },
                    { 8, "Admin@gmail.com", "", "Admin", "Admin.12", 1, "Admin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 3);
        }
    }
}
