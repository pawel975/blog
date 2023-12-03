using Blog.Entities;
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
        public string BlogPostContent { get; set; }
        public List<BlogContentImage>? BlogContentImages { get; set; }
    }
}
