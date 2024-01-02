using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.Migrations
{
    /// <inheritdoc />
    public partial class inti7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentElements_BlogPosts_BlogPostId",
                table: "ContentElements");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdersInBlogPosts_ContentElements_ContentElementId",
                table: "OrdersInBlogPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentElements",
                table: "ContentElements");

            migrationBuilder.RenameTable(
                name: "ContentElements",
                newName: "ContentElement");

            migrationBuilder.RenameIndex(
                name: "IX_ContentElements_BlogPostId",
                table: "ContentElement",
                newName: "IX_ContentElement_BlogPostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentElement",
                table: "ContentElement",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentElement_BlogPosts_BlogPostId",
                table: "ContentElement",
                column: "BlogPostId",
                principalTable: "BlogPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_ContentElement_BlogPosts_BlogPostId",
                table: "ContentElement");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdersInBlogPosts_ContentElement_ContentElementId",
                table: "OrdersInBlogPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentElement",
                table: "ContentElement");

            migrationBuilder.RenameTable(
                name: "ContentElement",
                newName: "ContentElements");

            migrationBuilder.RenameIndex(
                name: "IX_ContentElement_BlogPostId",
                table: "ContentElements",
                newName: "IX_ContentElements_BlogPostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentElements",
                table: "ContentElements",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentElements_BlogPosts_BlogPostId",
                table: "ContentElements",
                column: "BlogPostId",
                principalTable: "BlogPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdersInBlogPosts_ContentElements_ContentElementId",
                table: "OrdersInBlogPosts",
                column: "ContentElementId",
                principalTable: "ContentElements",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}
