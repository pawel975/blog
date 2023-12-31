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
        // Connection with BlogPost
        public Guid BlogPostId { get; set; }
        public virtual BlogPost BlogPost { get; set; }
        // Connection With OrderInBlogPost
        public int OrderInBlogPostId { get; set; }
        public virtual OrderInBlogPost OrderInBlogPost { get; set; }

    }
}