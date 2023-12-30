﻿using Blog.Entities.BlogPostContentEntities;
using Microsoft.EntityFrameworkCore;

namespace Blog.Entities
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<OrderInBlogPost> OrdersInBlogPosts { get; set; }
        public DbSet<ContentElement> ContentElements { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BlogPost>()
                .Property(bp => bp.Title)
                .IsRequired();

            modelBuilder.Entity<Role>()
                .Property(r => r.Name)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(r => r.Email)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(r => r.FirstName)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(r => r.LastName)
                .IsRequired();
        }

    }
}
