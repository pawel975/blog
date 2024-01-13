using Blog.Entities;
using FluentValidation;

namespace Blog.Models.Validators
{
    public class CreateBlogPostDtoValidator : AbstractValidator<CreateBlogPostDto>
    {
        public CreateBlogPostDtoValidator()
        {
            RuleFor(bp => bp.Title)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(100);

            RuleFor(bp => bp.ShortDescription)
                .NotEmpty()
                .MinimumLength(30)
                .MaximumLength(200);

            RuleFor(bp => bp.Paragraphs)
                .NotEmpty();

            RuleFor(bp => bp.Headers)
                .NotEmpty();

            RuleFor(bp => bp.CodeBlocks)
                .NotEmpty();

            RuleFor(bp => bp.ContentImages)
                .NotEmpty();
        }
    }
}
