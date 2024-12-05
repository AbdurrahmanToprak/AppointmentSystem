using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFeedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "point",
                table: "FeedBacks",
                newName: "Point");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "FeedBacks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "FeedBacks");

            migrationBuilder.RenameColumn(
                name: "Point",
                table: "FeedBacks",
                newName: "point");
        }
    }
}
