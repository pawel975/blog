using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Models.BlogPostContentModels
{
    public class ContentImageDto : ContentElementDto
    {
        public string AltText { get; set; }
        public string Type { get; } = BlogPostContentElementType.ContentImage;

    }
}
