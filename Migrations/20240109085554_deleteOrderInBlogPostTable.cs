using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.Migrations
{
    /// <inheritdoc />
    public partial class deleteOrderInBlogPostTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentElement_BlogPosts_BlogPostId",
                table: "ContentElement");

            migrationBuilder.DropTable(
                name: "OrdersInBlogPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentElement",
                table: "ContentElement");

            migrationBuilder.DropColumn(
                name: "AltText",
                table: "ContentElement");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "ContentElement");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "ContentElement");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "ContentElement");

            migrationBuilder.RenameTable(
                name: "ContentElement",
                newName: "Paragraphs");

            migrationBuilder.RenameIndex(
                name: "IX_ContentElement_BlogPostId",
                table: "Paragraphs",
                newName: "IX_Paragraphs_BlogPostId");

            migrationBuilder.AddColumn<int>(
                name: "OrderInBlogPost",
                table: "Paragraphs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Paragraphs",
                table: "Paragraphs",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CodeBlocks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderInBlogPost = table.Column<int>(type: "int", nullable: false),
                    BlogPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeBlocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CodeBlocks_BlogPosts_BlogPostId",
                        column: x => x.BlogPostId,
                        principalTable: "BlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContentImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AltText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderInBlogPost = table.Column<int>(type: "int", nullable: false),
                    BlogPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentImages_BlogPosts_BlogPostId",
                        column: x => x.BlogPostId,
                        principalTable: "BlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Headers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderInBlogPost = table.Column<int>(type: "int", nullable: false),
                    BlogPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Headers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Headers_BlogPosts_BlogPostId",
                        column: x => x.BlogPostId,
                        principalTable: "BlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CodeBlocks_BlogPostId",
                table: "CodeBlocks",
                column: "BlogPostId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentImages_BlogPostId",
                table: "ContentImages",
                column: "BlogPostId");

            migrationBuilder.CreateIndex(
                name: "IX_Headers_BlogPostId",
                table: "Headers",
                column: "BlogPostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Paragraphs_BlogPosts_BlogPostId",
                table: "Paragraphs",
                column: "BlogPostId",
                principalTable: "BlogPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Paragraphs_BlogPosts_BlogPostId",
                table: "Paragraphs");

            migrationBuilder.DropTable(
                name: "CodeBlocks");

            migrationBuilder.DropTable(
                name: "ContentImages");

            migrationBuilder.DropTable(
                name: "Headers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Paragraphs",
                table: "Paragraphs");

            migrationBuilder.DropColumn(
                name: "OrderInBlogPost",
                table: "Paragraphs");

            migrationBuilder.RenameTable(
                name: "Paragraphs",
                newName: "ContentElement");

            migrationBuilder.RenameIndex(
                name: "IX_Paragraphs_BlogPostId",
                table: "ContentElement",
                newName: "IX_ContentElement_BlogPostId");

            migrationBuilder.AddColumn<string>(
                name: "AltText",
                table: "ContentElement",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "ContentElement",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "ContentElement",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "ContentElement",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentElement",
                table: "ContentElement",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OrdersInBlogPosts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BlogPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContentElementId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PlaceInOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdersInBlogPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdersInBlogPosts_BlogPosts_BlogPostId",
                        column: x => x.BlogPostId,
                        principalTable: "BlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdersInBlogPosts_ContentElement_ContentElementId",
                        column: x => x.ContentElementId,
                        principalTable: "ContentElement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrdersInBlogPosts_BlogPostId",
                table: "OrdersInBlogPosts",
                column: "BlogPostId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdersInBlogPosts_ContentElementId",
                table: "OrdersInBlogPosts",
                column: "ContentElementId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentElement_BlogPosts_BlogPostId",
                table: "ContentElement",
                column: "BlogPostId",
                principalTable: "BlogPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
