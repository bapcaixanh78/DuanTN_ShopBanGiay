using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiayPoly.Migrations
{
    /// <inheritdoc />
    public partial class add_column : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DetailProducts_ProductId",
                table: "DetailProducts");

            migrationBuilder.AddColumn<string>(
                name: "Sizes",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DetailProducts_ProductId",
                table: "DetailProducts",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DetailProducts_ProductId",
                table: "DetailProducts");

            migrationBuilder.DropColumn(
                name: "Sizes",
                table: "Products");

            migrationBuilder.CreateIndex(
                name: "IX_DetailProducts_ProductId",
                table: "DetailProducts",
                column: "ProductId",
                unique: true);
        }
    }
}
