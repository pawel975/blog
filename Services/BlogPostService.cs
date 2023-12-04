using AutoMapper;
using Blog.Entities;
using Blog.Models;

namespace Blog.Services
{
    public interface IBlogPostService
    {
        int Create(CreateBlogPostDto dto);
        List<BlogPost> GetAllBlogPosts();
        BlogPost GetBlogPostById(int id);
        void Update(int blogPostId, UpdateBlogPostDto dto);
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

            return blogPosts;
        }

        public BlogPost GetBlogPostById(int id)
        {
            BlogPost blogPost = _dbContext.BlogPosts.FirstOrDefault(bp => bp.Id == id);

            return blogPost;
        }

        public int Create(CreateBlogPostDto dto)
        {
            var blogPost = _mapper.Map<BlogPost>(dto);

            _dbContext.BlogPosts.Add(blogPost);
            _dbContext.SaveChanges();

            return blogPost.Id;

        }

        public void Update(int blogPostId, UpdateBlogPostDto dto)
        {
            var blogPost = _dbContext.BlogPosts.FirstOrDefault(bp => bp.Id == blogPostId);

            blogPost.Title = dto.Title != null ? dto.Title : blogPost.Title;
            blogPost.ShortDescription = dto.ShortDescription != null ? dto.ShortDescription : blogPost.ShortDescription;
            blogPost.BlogPostContent = dto.BlogPostContent != null ? dto.BlogPostContent : blogPost.BlogPostContent;
            blogPost.PrimaryImageSrc = dto.PrimaryImageSrc != null ? dto.PrimaryImageSrc : blogPost.PrimaryImageSrc;
            blogPost.BlogContentImages = dto.BlogContentImages != null ? dto.BlogContentImages : blogPost.BlogContentImages;

            _dbContext.SaveChanges();
        }
    }
}
