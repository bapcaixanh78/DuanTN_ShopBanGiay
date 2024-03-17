using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiayPoly.Migrations
{
    /// <inheritdoc />
    public partial class chang2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgSlug",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgSlug",
                table: "Products");
        }
    }
}
