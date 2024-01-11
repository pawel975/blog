using Blog.Entities;
using FluentValidation;

namespace Blog.Models.Validators
{
    public class UpdateBlogPostDtoValidator : AbstractValidator<UpdateBlogPostDto>
    {
        public UpdateBlogPostDtoValidator(BlogDbContext dbContext)
        {
            RuleFor(x => x.Title)
                   .NotEmpty()
                   .MinimumLength(3)
                   .MaximumLength(100);

            RuleFor(x => x.ShortDescription)
                .NotEmpty()
                .MinimumLength(30)
                .MaximumLength(200);

        }
    }
}
