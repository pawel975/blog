using System.ComponentModel.DataAnnotations;

namespace Blog.Models
{
    public class LoginUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
