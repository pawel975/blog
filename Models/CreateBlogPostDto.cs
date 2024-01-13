using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;
using Blog.Models.BlogPostContentModels;
using System.ComponentModel.DataAnnotations;

namespace Blog.Models
{
    public class CreateBlogPostDto
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string PrimaryImageSrc { get; set; }
        public List<ParagraphDto> Paragraphs { get; set; }
        public List<HeaderDto> Headers { get; set; } 
        public List<CodeBlockDto> CodeBlocks { get; set; } 
        public List<ContentImageDto> ContentImages { get; set; } 

    }
}
