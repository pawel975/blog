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
        //public string Type { get; set; }
        // Connection with BlogPost
        public Guid BlogPostId { get; set; }
        public virtual BlogPost BlogPost { get; set; }
        // Connection With OrderInBlogPost
        //public Guid OrderInBlogPostId { get; set; }
        public virtual OrderInBlogPost OrderInBlogPost { get; set; }

    }
}