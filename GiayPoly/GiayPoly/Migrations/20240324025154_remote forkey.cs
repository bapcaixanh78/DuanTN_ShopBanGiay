using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiayPoly.Migrations
{
    /// <inheritdoc />
    public partial class remoteforkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailProducts_Products_ProductId",
                table: "DetailProducts");

            migrationBuilder.DropIndex(
                name: "IX_DetailProducts_ProductId",
                table: "DetailProducts");

            migrationBuilder.DropColumn(
                name: "ProductDetailId",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ListProductDetailId",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ListProductDetailId",
                table: "Products");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductDetailId",
                table: "Products",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DetailProducts_ProductId",
                table: "DetailProducts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailProducts_Products_ProductId",
                table: "DetailProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
