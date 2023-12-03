using AutoMapper;
using Blog.Entities;
using Blog.Models;

namespace Blog
{
    public class BlogMappingProfile: Profile
    {
        public BlogMappingProfile()
        {
            CreateMap<CreateBlogPostDto, BlogPost>();
        }
    }
}
