using AutoMapper;
using Blog.Entities;
using Blog.Models;
using System.Reflection;

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

            if (blogPost is null)
            {
                throw new Exception();
            }

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
    }
}
