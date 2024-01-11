﻿// <auto-generated />
using System;
using Blog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Blog.Migrations
{
    [DbContext(typeof(BlogDbContext))]
    [Migration("20240102103635_inti10")]
    partial class inti10
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Blog.Entities.BlogPost", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("PrimaryImageSrc")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("BlogPosts");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.ContentElement", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BlogPostId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ContentElement");

                    b.HasDiscriminator<string>("Discriminator").HasValue("ContentElement");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.OrderInBlogPost", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BlogPostId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ContentElementId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("PlaceInOrder")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BlogPostId");

                    b.HasIndex("ContentElementId")
                        .IsUnique();

                    b.ToTable("OrdersInBlogPosts");
                });

            modelBuilder.Entity("Blog.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Blog.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.CodeBlock", b =>
                {
                    b.HasBaseType("Blog.Entities.BlogPostContentEntities.ContentElement");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasIndex("BlogPostId");

                    b.HasDiscriminator().HasValue("CodeBlock");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.ContentImage", b =>
                {
                    b.HasBaseType("Blog.Entities.BlogPostContentEntities.ContentElement");

                    b.Property<string>("AltText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasIndex("BlogPostId");

                    b.HasDiscriminator().HasValue("ContentImage");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.Header", b =>
                {
                    b.HasBaseType("Blog.Entities.BlogPostContentEntities.ContentElement");

                    b.Property<string>("Level")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasIndex("BlogPostId");

                    b.HasDiscriminator().HasValue("Header");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.Paragraph", b =>
                {
                    b.HasBaseType("Blog.Entities.BlogPostContentEntities.ContentElement");

                    b.HasIndex("BlogPostId");

                    b.HasDiscriminator().HasValue("Paragraph");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.OrderInBlogPost", b =>
                {
                    b.HasOne("Blog.Entities.BlogPost", "BlogPost")
                        .WithMany("OrderInBlogPost")
                        .HasForeignKey("BlogPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Blog.Entities.BlogPostContentEntities.ContentElement", "ContentElement")
                        .WithOne("OrderInBlogPost")
                        .HasForeignKey("Blog.Entities.BlogPostContentEntities.OrderInBlogPost", "ContentElementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BlogPost");

                    b.Navigation("ContentElement");
                });

            modelBuilder.Entity("Blog.Entities.User", b =>
                {
                    b.HasOne("Blog.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.CodeBlock", b =>
                {
                    b.HasOne("Blog.Entities.BlogPost", "BlogPost")
                        .WithMany("CodeBlocks")
                        .HasForeignKey("BlogPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BlogPost");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.ContentImage", b =>
                {
                    b.HasOne("Blog.Entities.BlogPost", "BlogPost")
                        .WithMany("ContentImages")
                        .HasForeignKey("BlogPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BlogPost");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.Header", b =>
                {
                    b.HasOne("Blog.Entities.BlogPost", "BlogPost")
                        .WithMany("Headers")
                        .HasForeignKey("BlogPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BlogPost");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.Paragraph", b =>
                {
                    b.HasOne("Blog.Entities.BlogPost", "BlogPost")
                        .WithMany("Paragraphs")
                        .HasForeignKey("BlogPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BlogPost");
                });

            modelBuilder.Entity("Blog.Entities.BlogPost", b =>
                {
                    b.Navigation("CodeBlocks");

                    b.Navigation("ContentImages");

                    b.Navigation("Headers");

                    b.Navigation("OrderInBlogPost");

                    b.Navigation("Paragraphs");
                });

            modelBuilder.Entity("Blog.Entities.BlogPostContentEntities.ContentElement", b =>
                {
                    b.Navigation("OrderInBlogPost")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
