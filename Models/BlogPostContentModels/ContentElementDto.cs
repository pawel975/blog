using System.ComponentModel.DataAnnotations;

namespace Blog.Models.BlogPostContentModels
{
    public class ContentElementDto
    {
        //public enum BlogPostElementType
        //{
        //    PARAGRAPH,
        //    HEADER,
        //    CODE_BLOCK,
        //    CONTENT_IMAGE
        //}

        [Required]
        public string Content { get; set; }
        //[Required]
        //public string Type { get; set; }
    }
}