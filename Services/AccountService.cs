using AutoMapper;
using Blog.Entities;
using Blog.Exceptions;
using Blog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Paseto.Builder;
using Paseto;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Humanizer;

namespace Blog.Services
{
    public interface IAccountService
    {
        void GenerateSession(LoginUserDto dto, ISession session);
        void RegisterUser(RegisterUserDto dto);
    }

    public class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly BlogDbContext _dbContext;
        private readonly AuthenticationSettings _authenticationSettings;

        public AccountService(BlogDbContext dbContext, IMapper mapper, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _dbContext = dbContext;
            _authenticationSettings = authenticationSettings;
        }

        public void RegisterUser(RegisterUserDto dto)
        {
            User newUser = _mapper.Map<User>(dto);

            newUser.PasswordHash = _passwordHasher.HashPassword(newUser, dto.Password);

            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();

        }

        //TODO: Change token auth to session auth
        //public string GenerateJwt(LoginUserDto dto)
        //{
        //    var user = _dbContext.Users
        //        .Include(u => u.Role)
        //        .FirstOrDefault(u => u.Email == dto.Email);

        //    if (user == null)
        //    {
        //        throw new BadRequestException("Invalid username or password");
        //    }

        //    var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

        //    if (result == PasswordVerificationResult.Failed)
        //    {
        //        throw new BadRequestException("Invalid username or password");
        //    }

        //    var claims = new List<Claim>()
        //    {
        //        new(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //        new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
        //        new(ClaimTypes.Role, user.Role.Name),
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
        //    var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //    var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

        //    var token = new JwtSecurityToken(
        //        _authenticationSettings.JwtIssuer,
        //        _authenticationSettings.JwtIssuer,
        //        claims,
        //        expires: expires,
        //        signingCredentials: cred);

        //    var tokenHandler = new JwtSecurityTokenHandler();

        //    return tokenHandler.WriteToken(token);
        //}

        // TODO: Probably should change this service name on more descriptive
        public void GenerateSession(LoginUserDto dto, ISession session)
        {

            var user = _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.Email == dto.Email) ?? throw new BadRequestException("Invalid username or password");

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid username or password");
            }

            session.SetString("firstName", user.FirstName);
            session.SetString("lastName", user.LastName);
            session.SetString("role", user.Role.Name);
        }

    }

}
