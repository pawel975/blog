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
    }
}
