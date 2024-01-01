using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;
using Blog.Models.BlogPostContentModels;
using System.ComponentModel.DataAnnotations;

namespace Blog.Models
{
    public class CreateBlogPostDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        public string PrimaryImageSrc { get; set; }
        [Required]
        public virtual ICollection<ParagraphDto> Paragraphs { get; set; } = new List<ParagraphDto>();
        [Required]
        public virtual ICollection<HeaderDto> Headers { get; set; } = new List<HeaderDto>();
        [Required]
        public virtual ICollection<CodeBlockDto> CodeBlocks { get; set; } = new List<CodeBlockDto>();
        [Required]
        public virtual ICollection<ContentImageDto> ContentImages { get; set; } = new List<ContentImageDto>();

    }
}
