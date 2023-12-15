
namespace Blog.Entities
{
    public class BlogPost
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string PrimaryImageSrc { get; set; }
        public string BlogPostContent { get; set; }
        public List<BlogContentImage> BlogContentImages { get; set; }

    }
}
