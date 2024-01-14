using Blog.Entities.BlogPostContentEntities.Types;
using System.ComponentModel.DataAnnotations;

namespace Blog.Entities.BlogPostContentEntities
{
    public class ContentElement
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public virtual string Type { get; set; }
        [Required]
        public int OrderInBlogPost { get; set; }
        // Connection with BlogPost
        public Guid BlogPostId { get; set; }
        public virtual BlogPost BlogPost { get; set; }
    }
}