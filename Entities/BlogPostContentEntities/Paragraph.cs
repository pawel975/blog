using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Entities.BlogPostContentEntities
{
    public class Paragraph : ContentElement
    {
        public string Type { get; } = BlogPostContentElementType.Paragraph;
    }
}
