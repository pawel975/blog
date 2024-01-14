using AutoMapper;
using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;
using Blog.Exceptions;
using Blog.Models;
using Blog.Models.BlogPostContentModels;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Reflection.PortableExecutable;

namespace Blog.Services
{
    public interface IBlogPostService
    {
        Guid Create(CreateBlogPostDto dto);
        void Delete(Guid blogPostId);
        List<BlogPostDto> GetAllBlogPosts();
        BlogPostDto GetBlogPostById(Guid id);
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

        public List<BlogPostDto> GetAllBlogPosts()
        {
            List<BlogPost> blogPosts = _dbContext.BlogPosts
                .Include(bp => bp.Paragraphs)
                .Include(bp => bp.Headers)
                .Include(bp => bp.CodeBlocks)
                .Include(bp => bp.ContentImages)
                .ToList();

            List<BlogPostDto> blogPostsDtos = _mapper.Map<List<BlogPostDto>>(blogPosts);
            return blogPostsDtos;
        }

        public BlogPostDto GetBlogPostById(Guid id)
        {
            var blogPost = _dbContext.BlogPosts.FirstOrDefault(bp => bp.Id == id);

            return blogPost is null ? throw new NotFoundException("Blog post not found") : _mapper.Map<BlogPostDto>(blogPost);
        }

        public Guid Create(CreateBlogPostDto dto)
        {
            // TODO: It might be possible to shorten those mappings for each element type
            var blogPost = _mapper.Map<BlogPost>(dto);

            IEnumerable<ParagraphDto> paragraphsDtos = dto.Paragraphs;
            IEnumerable<HeaderDto> headerDtos = dto.Headers;
            IEnumerable<CodeBlockDto> codeblockDtos = dto.CodeBlocks;
            IEnumerable<ContentImageDto> contentImageDtos = dto.ContentImages;

            List<Paragraph> paragraphs = new List<Paragraph>();
            List<Header> headers = new List<Header>();
            List<CodeBlock> codeblocks = new List<CodeBlock>();
            List<ContentImage> contentImages = new List<ContentImage>(); 

            // Paragraphs Maps
            foreach (ParagraphDto paragraphDto in paragraphsDtos)
            {
                Paragraph paragraph = _mapper.Map<Paragraph>(paragraphDto);
                paragraph.BlogPost = blogPost;

                paragraphs.Add(paragraph);
            }

            // Headers Map
            foreach (HeaderDto headerDto in headerDtos)
            {
                Header header = _mapper.Map<Header>(headerDto);
                header.BlogPost = blogPost;

                headers.Add(header);
            }

            // CodeBlock Map
            foreach (CodeBlockDto codeblockDto in codeblockDtos)
            {
                CodeBlock codeblock = _mapper.Map<CodeBlock>(codeblockDto);
                codeblock.BlogPost = blogPost;

                codeblocks.Add(codeblock);

            }

            // ContentImage Map
            foreach (ContentImageDto contentImageDto in contentImageDtos)
            {
                ContentImage contentImage = _mapper.Map<ContentImage>(contentImageDto);
                contentImage.BlogPost = blogPost;

                contentImages.Add(contentImage);
            }

            blogPost.Paragraphs.AddRange(paragraphs);
            blogPost.Headers.AddRange(headers);
            blogPost.CodeBlocks.AddRange(codeblocks);
            blogPost.ContentImages.AddRange(contentImages);

            // TODO: Validate here if there is correct ordering in elements,
            // if places are not repeated and if last number equals elements count - 1
            // Throw exception if it's 

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
