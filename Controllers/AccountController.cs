using Blog.Models;
using Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
           _accountService.GenerateSession(dto, HttpContext.Session);

            return Ok();
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            _accountService.Logout(HttpContext);

            return Ok("User successfully logged out");
        }

        [HttpPost("verifyAdmin")]
        public ActionResult VerifyAdmin()
        {
            _accountService.IsUserAdmin(HttpContext.Session);

            return Ok(true);
        }

    }
}
