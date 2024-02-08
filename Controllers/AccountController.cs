using Blog.Models;
using Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public ActionResult RegisterUser([FromBody] RegisterUserDto dto)
        {
            _accountService.RegisterUser(dto);

            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginUserDto dto)
        {
            string token = _accountService.GenerateJwt(dto);

            return Ok(token);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("validateToken")]
        public ActionResult ValidateToken([FromBody] string token)
        {
            // TODO: It shouldn't be only role maybe, it's just to validate role
            var role = _accountService.ValidateToken(token);
            return Ok(role);
        }
    }
}
