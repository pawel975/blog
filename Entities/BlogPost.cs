﻿
using Blog.Entities.BlogPostContentEntities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Entities
{
    public class BlogPost
    {
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        public string PrimaryImageSrc { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Connection with all BlogPost ContentElements types
        public List<Paragraph> Paragraphs { get; set; }
        public List<Header> Headers { get; set; } 
        public List<CodeBlock> CodeBlocks { get; set; } 
        public List<ContentImage> ContentImages { get; set; }   

        // Connection with OrderInBlogPost
        public List<OrderInBlogPost> OrderInBlogPost { get; set; }
    }
}
