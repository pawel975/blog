
using Blog.Entities.BlogPostContentEntities;
using System.ComponentModel.DataAnnotations;

namespace Blog.Entities
{
    public class BlogPost
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        public string PrimaryImageSrc { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        // Connection with all BlogPost ContentElements
        public virtual ICollection<ContentElement> ContentElements { get; set; }
        // Connection with OrderInBlogPost
        public virtual ICollection<OrderInBlogPost> OrderInBlogPost { get; set; }
    }
}
