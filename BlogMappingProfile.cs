using AutoMapper;
using Blog.Models;
using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;
using Humanizer;
using Blog.Models.BlogPostContentModels;

namespace Blog
{
    public class BlogMappingProfile : Profile
    {
        public BlogMappingProfile()
        {
            CreateMap<BlogPost, BlogPostDto>();

            CreateMap<CreateBlogPostDto, BlogPost>();

            CreateMap<ContentElementDto, ContentElement>();

            CreateMap<ParagraphDto, Paragraph>();
            CreateMap<HeaderDto, Header>();
            CreateMap<CodeBlockDto, CodeBlock>();
            CreateMap<ContentImageDto, ContentImage>();

            CreateMap<Paragraph, ParagraphDto>();
            CreateMap<Header,HeaderDto >();
            CreateMap<CodeBlock, CodeBlockDto >();
            CreateMap<ContentImage, ContentImageDto>();
        }
    
    }
}
