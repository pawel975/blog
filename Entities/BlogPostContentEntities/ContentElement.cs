using System.ComponentModel.DataAnnotations;

namespace Blog.Entities.BlogPostContentEntities
{
    public class ContentElement
    {
        public enum BlogPostContentType
        {
            PARAGRAPH,
            HEADER,
            CODE_BLOCK,
            IMAGE
        }
        [Key]
        public Guid Id { get; set; }
        [Required]
        public BlogPostContentType Type {get; set;}
        public string Content { get; set; }
        // TODO: Make it increment in service provider, possibly based
        // on blogPost content elements count and make it last
        //public int PlaceInBlogPost { get; set; }
        [Required]
        // Connection with BlogPost
        public Guid BlogPostId { get; set; }
        [Required]
        public virtual BlogPost BlogPost { get; set; }
        // Connection With OrderInBlogPost
        public int OrderInBlogPostId { get; set; }
        public virtual OrderInBlogPost OrderInBlogPost { get; set; }

    }
}