using AutoMapper;
using Blog.Models;
using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;
using Humanizer;

namespace Blog
{
    public class BlogMappingProfile : Profile
    {
        public BlogMappingProfile()
        {
            CreateMap<CreateBlogPostDto, BlogPost>();
        }
    
    }
}
