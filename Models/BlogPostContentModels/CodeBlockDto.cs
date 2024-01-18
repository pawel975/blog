using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Models.BlogPostContentModels
{
    public class CodeBlockDto : ContentElementDto
    {
        public string Language { get; set; }
        public string Type { get; } = BlogPostContentElementType.CodeBlock;
    }
}
