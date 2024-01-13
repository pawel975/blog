using FluentValidation;

namespace Blog.Models.Validators
{
    public class LoginUserDtoValidator: AbstractValidator<LoginUserDto>
    {
        public LoginUserDtoValidator()
        {
            RuleFor(l => l.Email).NotEmpty();
            RuleFor(l => l.Password).NotEmpty();
        }
    }
}
