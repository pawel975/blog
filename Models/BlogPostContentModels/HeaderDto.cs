using Blog.Entities.BlogPostContentEntities.Types;

namespace Blog.Models.BlogPostContentModels
{
    public class HeaderDto : ContentElementDto
    {
        public string Level { get; set; }
        public string Type { get; } = BlogPostContentElementType.Header;
    }
}
