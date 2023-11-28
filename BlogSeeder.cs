using Blog.Entities;

namespace Blog
{
    public class BlogSeeder
    {
        private readonly BlogDbContext _dbContext;

        public BlogSeeder(BlogDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            if (!_dbContext.Database.CanConnect())
            {
                if (!_dbContext.BlogPosts.Any())
                {
                    var blogPosts = GetBlogPosts();
                    _dbContext.BlogPosts.AddRange(blogPosts);
                    _dbContext.SaveChanges();
                }

                if (!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<BlogPost> GetBlogPosts()
        {
            var blogPosts = new List<BlogPost>()
            {
                new BlogPost
                {
                    Title = "First Post",
                    ShortDescription = "This is short description of my first post",
                    PrimaryImageSrc = default,
                    BlogPostContent = "This is content of my first post",
                    BlogContentImages = new List<BlogContentImage>()
                    {
                        new BlogContentImage
                        {
                            ImageSrc = "",
                            AltTitle = "Alt title for image"
                        }
                    }   
                }

            };

            return blogPosts;
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role
                {
                    Name = "Admin"
                },
                new Role
                {
                    Name = "User"
                }
            };

            return roles;
        }
    }
}