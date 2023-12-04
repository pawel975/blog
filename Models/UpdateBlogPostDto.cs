using Blog.Entities;

namespace Blog.Models
{
    public class UpdateBlogPostDto
    {
        public string? Title { get; set; }
        public string? ShortDescription { get; set; }
        public string? PrimaryImageSrc { get; set; }
        public string? BlogPostContent { get; set; }
        public List<BlogContentImage>? BlogContentImages { get; set; }
    }
}
