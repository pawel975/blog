using Blog.Entities;

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
                    BlogPostContent = "This is the content of my first post",
                    BlogContentImages = new List<BlogContentImage>()
                    {
                        new BlogContentImage
                        {
                            ImageSrc = "",
                            AltTitle = "Alt title for image"
                        }
                    }
                },
                new BlogPost
                {
                    Title = "Second Post",
                    ShortDescription = "This is the short description of my second post",
                    PrimaryImageSrc = "",
                    BlogPostContent = "This is the content of my second post",
                    BlogContentImages = new List<BlogContentImage>()
                    {
                        new BlogContentImage
                        {
                            ImageSrc = "",
                            AltTitle = "Alt title for image"
                        }
                    }
                },
                new BlogPost
                {
                    Title = "Third Post",
                    ShortDescription = "This is the short description of my third post",
                    PrimaryImageSrc = "",
                    BlogPostContent = "This is the content of my third post",
                    BlogContentImages = new List<BlogContentImage>()
                    {
                        new BlogContentImage
                        {
                            ImageSrc = "",
                            AltTitle = "Alt title for image"
                        }
                    }
                },
                new BlogPost
                {
                    Title = "Fourth Post",
                    ShortDescription = "This is the short description of my fourth post",
                    PrimaryImageSrc = "",
                    BlogPostContent = "This is the content of my fourth post",
                    BlogContentImages = new List<BlogContentImage>()
                    {
                        new BlogContentImage
                        {
                            ImageSrc = "",
                            AltTitle = "Alt title for image"
                        }
                    }
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