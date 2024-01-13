using Blog.Entities;
using System.ComponentModel.DataAnnotations;

namespace Blog.Models
{
    public class RegisterUserDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public DateTime? DateOfBirth { get; set; }
        // By defaut new user will have 'User' Role
        public int RoleId { get; set; } = 2;
    }
}
