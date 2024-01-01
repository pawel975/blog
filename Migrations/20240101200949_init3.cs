using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.Migrations
{
    /// <inheritdoc />
    public partial class init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentElement_OrdersInBlogPosts_OrderInBlogPostId",
                table: "ContentElement");

            migrationBuilder.DropIndex(
                name: "IX_ContentElement_OrderInBlogPostId",
                table: "ContentElement");

            migrationBuilder.DropColumn(
                name: "OrderInBlogPostId",
                table: "ContentElement");

            migrationBuilder.AddColumn<Guid>(
                name: "ContentElementId",
                table: "OrdersInBlogPosts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_OrdersInBlogPosts_ContentElementId",
                table: "OrdersInBlogPosts",
                column: "ContentElementId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdersInBlogPosts_ContentElement_ContentElementId",
                table: "OrdersInBlogPosts",
                column: "ContentElementId",
                principalTable: "ContentElement",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdersInBlogPosts_ContentElement_ContentElementId",
                table: "OrdersInBlogPosts");

            migrationBuilder.DropIndex(
                name: "IX_OrdersInBlogPosts_ContentElementId",
                table: "OrdersInBlogPosts");

            migrationBuilder.DropColumn(
                name: "ContentElementId",
                table: "OrdersInBlogPosts");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderInBlogPostId",
                table: "ContentElement",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ContentElement_OrderInBlogPostId",
                table: "ContentElement",
                column: "OrderInBlogPostId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentElement_OrdersInBlogPosts_OrderInBlogPostId",
                table: "ContentElement",
                column: "OrderInBlogPostId",
                principalTable: "OrdersInBlogPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
