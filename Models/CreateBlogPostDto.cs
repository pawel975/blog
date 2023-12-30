using Blog.Entities;
using Blog.Entities.BlogPostContentEntities;
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
        public virtual ICollection<ContentElement> ContentElements { get; set; }

    }
}
