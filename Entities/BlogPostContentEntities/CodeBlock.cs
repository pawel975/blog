using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Entities.BlogPostContentEntities
{
    public class CodeBlock: ContentElement
    {
        public string Language { get; set; }
        public string Type { get; } = BlogPostContentElementType.CodeBlock;
    }
}
