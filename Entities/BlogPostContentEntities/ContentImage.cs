using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Entities.BlogPostContentEntities
{
    public class ContentImage : ContentElement
    {
        public string AltText { get; set; }
        public string Type { get; } = BlogPostContentElementType.ContentImage;
    }
}
