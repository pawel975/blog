using Blog.Entities;
using FluentValidation;

namespace Blog.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(BlogDbContext dbContext)
        {
            RuleFor(r => r.Email)
                .NotEmpty()
                .EmailAddress();

            // TODO: Make password demands more complicated
            RuleFor(r => r.Password)
                .MinimumLength(8)
                .MaximumLength(30)
                .NotEmpty();

            RuleFor(r => r.ConfirmPassword).Equal(e => e.Password);

            RuleFor(r => r.Email)
                .Custom((value, context) =>
                {
                    var emailInUse = dbContext.Users.Any(u => u.Email == value);

                    if (emailInUse)
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });
        }
    }
}
