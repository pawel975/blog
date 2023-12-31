﻿using AutoMapper;
using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;
using Blog.Exceptions;
using Blog.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Blog.Services
{
    public interface IBlogPostService
    {
        Guid Create(CreateBlogPostDto dto);
        void Delete(Guid blogPostId);
        List<BlogPost> GetAllBlogPosts();
        BlogPost GetBlogPostById(Guid id);
        void Update(Guid blogPostId, UpdateBlogPostDto dto);
    }

    public class BlogPostService : IBlogPostService
    {
        private readonly IMapper _mapper;
        private readonly BlogDbContext _dbContext;

        public BlogPostService(BlogDbContext dbContext, IMapper mapper)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public List<BlogPost> GetAllBlogPosts()
        {
            List<BlogPost> blogPosts = _dbContext.BlogPosts.ToList();

            Console.WriteLine(blogPosts);

            return blogPosts;
        }

        public BlogPost GetBlogPostById(Guid id)
        {
            BlogPost blogPost = _dbContext.BlogPosts.FirstOrDefault(bp => bp.Id == id);

            return blogPost is null ? throw new NotFoundException("Blog post not found") : blogPost;
        }

        public Guid Create(CreateBlogPostDto dto)
        {
            var blogPost = _mapper.Map<BlogPost>(dto);

            foreach(ContentElement contentElement in blogPost.ContentElements)
            {
                contentElement.BlogPost = blogPost;    
                contentElement.OrderInBlogPost = new OrderInBlogPost()
                {
                    PlaceInOrder = _dbContext.OrdersInBlogPosts.Count(),

                    BlogPostId = blogPost.Id,
                    BlogPost = blogPost
                };

            }

            _dbContext.BlogPosts.Add(blogPost);
            _dbContext.SaveChanges();

            return blogPost.Id;
        }

        public void Update(Guid blogPostId, UpdateBlogPostDto dto)
        {
            var blogPost = _dbContext.BlogPosts.FirstOrDefault(bp => bp.Id == blogPostId);

            if (blogPost is null) throw new NotFoundException("Blog post not found");

            Type dtoType = dto.GetType();

            foreach (PropertyInfo dtoProp in dtoType.GetProperties())
            {
                // Check if the property exists in the BlogPost entity
                PropertyInfo? blogPostProp = blogPost.GetType().GetProperty(dtoProp.Name);
                if (blogPostProp != null && blogPostProp.CanWrite)
                {
                    // Get the value from the dto and update the corresponding property in blogPost if value is not null 
                    // otherwise leave blogPostprop value as it is
                    var value = dtoProp.GetValue(dto);
                    if (value is not null)
                    {
                        blogPostProp.SetValue(blogPost, value);
                    }
                }
            }

            _dbContext.SaveChanges();
        }

        public void Delete(Guid blogPostId)
        {
            var blogPost = _dbContext.BlogPosts.FirstOrDefault(bp => bp.Id == blogPostId);

            if (blogPost is null) throw new NotFoundException("Blog post not found");

            _dbContext.BlogPosts.Remove(blogPost);
            _dbContext.SaveChanges();

        }
    }
}
