using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;

namespace Blog
{
    public class BlogSeeder
    {
        public BlogDbContext _dbContext;

        public BlogSeeder(BlogDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {

            if (_dbContext.Database.CanConnect())
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
                    ShortDescription = "This is the short description of my first post",
                    PrimaryImageSrc = "",

                },
                new BlogPost
                {
                    Title = "Second Post",
                    ShortDescription = "This is the short description of my second post",
                    PrimaryImageSrc = "",
                },
                new BlogPost
                {
                    Title = "Third Post",
                    ShortDescription = "This is the short description of my third post",
                    PrimaryImageSrc = "",
                },
                new BlogPost
                {
                    Title = "Fourth Post",
                    ShortDescription = "This is the short description of my fourth post",
                    PrimaryImageSrc = "",
                },
                // Add more instances as needed
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