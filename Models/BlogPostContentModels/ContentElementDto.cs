using System.ComponentModel.DataAnnotations;

namespace Blog.Models.BlogPostContentModels
{
    public class ContentElementDto
    {
        [Required]
        public string Content { get; set; }
        [Required]
        public int OrderInBlogPost { get; set; }
    }
}