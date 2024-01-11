
using Blog.Entities.BlogPostContentEntities;
using Blog.Models.BlogPostContentModels;
using System.ComponentModel.DataAnnotations;

namespace Blog.Entities
{
    public class BlogPostDto
    {
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        public string PrimaryImageSrc { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Connection with all BlogPost ContentElements types
        public List<ParagraphDto> Paragraphs { get; set; }
        public List<HeaderDto> Headers { get; set; } 
        public List<CodeBlockDto> CodeBlocks { get; set; } 
        public List<ContentImageDto> ContentImages { get; set; } 
    }
}
