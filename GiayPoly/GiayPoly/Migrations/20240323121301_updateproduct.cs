using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiayPoly.Migrations
{
    /// <inheritdoc />
    public partial class updateproduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sale",
                table: "Products",
                newName: "Sale");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductDetailId",
                table: "Products",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "DetailProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DetailProducts_ProductId",
                table: "DetailProducts",
                column: "ProductId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailProducts_Products_ProductId",
                table: "DetailProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "DetailProducts");

            migrationBuilder.RenameColumn(
                name: "Sale",
                table: "Products",
                newName: "sale");
        }
    }
}
