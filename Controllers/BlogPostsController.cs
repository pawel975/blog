using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Blog.Entities;
using Blog.Services;
using Blog.Models;
using Blog.Exceptions;

namespace Blog.Controllers
{
    [Route("api/blogPosts")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostService _blogPostService;

        public BlogPostsController(IBlogPostService blogPostService)
        {
            _blogPostService = blogPostService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<BlogPostDto>> GetAll()
        {
            var blogPosts = _blogPostService.GetAllBlogPosts();

            return Ok(blogPosts);
        }

        [HttpGet("{id}")]
        public ActionResult<BlogPostDto> Get([FromRoute] Guid id)
        {
            var blogPost = _blogPostService.GetBlogPostById(id);

            return Ok(blogPost);
        }

        [HttpPost]
        public ActionResult CreateBlogPost([FromBody] CreateBlogPostDto dto)
        {
            Guid id = _blogPostService.Create(dto);

            return Created($"/api/blogPosts/{id}", null);
        }

        [HttpPut("{id}")]
        public ActionResult UpdatePost([FromRoute] Guid id, [FromBody] UpdateBlogPostDto dto)
        {
            _blogPostService.Update(id, dto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePost([FromRoute] Guid id)
        {
            _blogPostService.Delete(id);

            return NoContent();
        }
    }
}
