using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiayPoly.Migrations
{
    /// <inheritdoc />
    public partial class change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Decriper",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Img",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "imgID",
                table: "Products",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "Slug",
                table: "Products",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Products",
                newName: "Quantity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Products",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Products",
                newName: "imgID");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Products",
                newName: "Slug");

            migrationBuilder.AddColumn<string>(
                name: "Decriper",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
