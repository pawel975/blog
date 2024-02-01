using Blog.Entities;
using FluentValidation;

namespace Blog.Models.Validators
{
    public class CreateBlogPostDtoValidator : AbstractValidator<CreateBlogPostDto>
    {
       private enum LanguageType
        {
           jsx, tsx,cs, html, js, ts, css

    }
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
                p.RuleFor(x => x.OrderInBlogPost).GreaterThan(-1);
                p.RuleFor(x => x.Content).NotEmpty();
            });

            RuleFor(bp => bp.Headers).NotEmpty();

            RuleForEach(bp => bp.Headers).ChildRules(p =>
            {
                p.RuleFor(x => x.OrderInBlogPost).GreaterThan(-1);
                p.RuleFor(x => x.Content).NotEmpty();
                p.RuleFor(x => x.Level).NotEmpty();

            });

            RuleForEach(bp => bp.CodeBlocks).ChildRules(p =>
            {
                p.RuleFor(x => x.OrderInBlogPost).GreaterThan(-1);
                p.RuleFor(x => x.Content).NotEmpty();
                p.RuleFor(x => x.Language).NotEmpty();
                p.RuleFor(x => x.Language).IsEnumName(typeof(LanguageType), caseSensitive: true);
            });

            RuleForEach(bp => bp.ContentImages).ChildRules(p =>
            {
                p.RuleFor(x => x.OrderInBlogPost).GreaterThan(-1);
                p.RuleFor(x => x.Content).NotEmpty();
                p.RuleFor(x => x.AltText).NotEmpty();
            });
        }
    }
}
