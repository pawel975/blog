using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Models.BlogPostContentModels
{
    public class ParagraphDto : ContentElementDto
    {
        public string Type { get; } = BlogPostContentElementType.Paragraph;
    }
}
