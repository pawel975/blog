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
        public List<ParagraphDto> Paragraphs { get; set; }
        [Required]
        public List<HeaderDto> Headers { get; set; } 
        [Required]
        public List<CodeBlockDto> CodeBlocks { get; set; } 
        [Required]
        public List<ContentImageDto> ContentImages { get; set; } 

    }
}
