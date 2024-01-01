
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
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Connection with all BlogPost ContentElements types
        public virtual ICollection<Paragraph> Paragraphs { get; set; } = new List<Paragraph>();
        public virtual ICollection<Header> Headers { get; set; } = new List<Header>();
        public virtual ICollection<CodeBlock> CodeBlocks { get; set; } = new List<CodeBlock>();
        public virtual ICollection<ContentImage> ContentImages { get; set; } = new List<ContentImage>();

        // Connection with OrderInBlogPost
        public virtual ICollection<OrderInBlogPost> OrderInBlogPost { get; set; }
    }
}
