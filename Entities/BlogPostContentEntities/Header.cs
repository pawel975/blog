using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Entities.BlogPostContentEntities
{
    public class Header : ContentElement
    {
        public string Level { get; set; }
        public string Type { get; } = BlogPostContentElementType.Header;
    }
}
