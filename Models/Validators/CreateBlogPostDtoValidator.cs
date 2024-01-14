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

            RuleFor(bp => bp.Paragraphs).NotEmpty();

            RuleForEach(bp => bp.Paragraphs).ChildRules(p =>
            {
                p.RuleFor(x => x.OrderInBlogPost).NotEmpty();
            });

            RuleFor(bp => bp.Headers).NotEmpty();

            RuleForEach(bp => bp.Headers).ChildRules(p =>
            {
                p.RuleFor(x => x.OrderInBlogPost).NotEmpty();
            });

            RuleFor(bp => bp.CodeBlocks).NotEmpty();

            RuleForEach(bp => bp.CodeBlocks).ChildRules(p =>
            {
                p.RuleFor(x => x.OrderInBlogPost).NotEmpty();
            });

            RuleFor(bp => bp.ContentImages).NotEmpty();

            RuleForEach(bp => bp.ContentImages).ChildRules(p =>
            {
                p.RuleFor(x => x.OrderInBlogPost).NotEmpty();
            });
        }
    }
}
