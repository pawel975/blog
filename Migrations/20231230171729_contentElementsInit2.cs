using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.Migrations
{
    /// <inheritdoc />
    public partial class contentElementsInit2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogContentImages");

            migrationBuilder.DropColumn(
                name: "BlogPostContent",
                table: "BlogPosts");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "BlogPosts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "OrdersInBlogPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaceInOrder = table.Column<int>(type: "int", nullable: false),
                    BlogPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "ContentElements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BlogPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderInBlogPostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentElements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentElements_BlogPosts_BlogPostId",
                        column: x => x.BlogPostId,
                        principalTable: "BlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContentElements_OrdersInBlogPosts_OrderInBlogPostId",
                        column: x => x.OrderInBlogPostId,
                        principalTable: "OrdersInBlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentElements_BlogPostId",
                table: "ContentElements",
                column: "BlogPostId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentElements_OrderInBlogPostId",
                table: "ContentElements",
                column: "OrderInBlogPostId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrdersInBlogPosts_BlogPostId",
                table: "OrdersInBlogPosts",
                column: "BlogPostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentElements");

            migrationBuilder.DropTable(
                name: "OrdersInBlogPosts");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "BlogPosts");

            migrationBuilder.AddColumn<string>(
                name: "BlogPostContent",
                table: "BlogPosts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "BlogContentImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BlogPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AltTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageSrc = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogContentImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogContentImages_BlogPosts_BlogPostId",
                        column: x => x.BlogPostId,
                        principalTable: "BlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlogContentImages_BlogPostId",
                table: "BlogContentImages",
                column: "BlogPostId");
        }
    }
}
