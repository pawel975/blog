namespace Blog.Entities
{
    public class BlogContentImage
    {
        public int Id { get; set; }
        public string ImageSrc { get; set; }
        public string AltTitle { get; set; }

        public Guid BlogPostId { get; set; }
        public virtual BlogPost BlogPost { get; set; }
    }
}