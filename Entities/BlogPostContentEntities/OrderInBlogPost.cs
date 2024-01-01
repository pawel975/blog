namespace Blog.Entities.BlogPostContentEntities
{
    public class OrderInBlogPost
    {
        public Guid Id { get; set; }
        public int PlaceInOrder { get; set; }
        // Connection with BlogPost
        public Guid BlogPostId { get; set; }
        public virtual BlogPost BlogPost { get; set; }
        // Connection with ContentElement
        // TODO: Possibly to delete/ was uncommented and worked
        public Guid ContentElementId { get; set; }
        public virtual ContentElement ContentElement { get; set; }
    }
}