using Blog.Entities;

namespace Blog.Services
{
    public interface IBlogPostService
    {
        List<BlogPost> GetAllBlogPosts();
        BlogPost GetBlogPostById(int id);
    }

    public class BlogPostService : IBlogPostService
    {
        private readonly BlogDbContext _dbContext;

        public BlogPostService(BlogDbContext dbContext)
        {
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
    }
}
