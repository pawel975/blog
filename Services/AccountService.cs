﻿using AutoMapper;
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
using Microsoft.AspNetCore.Http.HttpResults;

namespace Blog.Services
{
    public interface IAccountService
    {
        void GenerateSession(LoginUserDto dto, ISession session);
        bool IsUserAdmin(ISession session);
        void Logout(HttpContext httpContext);
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

            // Looks if there is session in database for this user
            bool isUserSessionPresent = _dbContext.Sessions.Any(s => s.User == user);

            if (!isUserSessionPresent)
            {
                session.SetString("firstName", user.FirstName);
                session.SetString("lastName", user.LastName);
                session.SetString("userId", user.Id.ToString());

                Session sessionToDatabase = new()
                {
                    SessionId = session.Id,
                    CreatedAt = DateTime.Now,
                    ExpiredAt = DateTime.Now.AddMinutes(15),
                    Role = user.Role,
                    User = user
                };

                _dbContext.Sessions.Add(sessionToDatabase);
                _dbContext.SaveChanges();
            }
        }

        public void Logout(HttpContext httpContext)
        {
            var userId = httpContext.Session.GetString("userId");

            // Delete session from database
            var user = _dbContext.Users.FirstOrDefault(u => u.Id.ToString() == userId) 
                ?? throw new NotFoundException("Cannot find user in database");
            var userSession = _dbContext.Sessions.FirstOrDefault(s => s.User == user) 
                ?? throw new NotFoundException("Cannot find corresponding session for given user in database");

            _dbContext.Sessions.Remove(userSession);
            _dbContext.SaveChanges();

            // Destroy session cookie 
            httpContext.Response.Cookies.Append("sessionID", "", new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(-1),
                HttpOnly = true,
                Secure = true,
                IsEssential = true
            });

            httpContext.Session.Clear();
        }

        public bool IsUserAdmin(ISession session)
        {
            var userId = session.GetString("userId");

            var user = _dbContext.Users.FirstOrDefault(u => u.Id.ToString() == userId)
                ?? throw new NotFoundException("Cannot find user in database");
            var userSession = _dbContext.Sessions.FirstOrDefault(s => s.User == user)
                ?? throw new NotFoundException("Cannot find corresponding session for given user in database");

            return userSession.Role.Name == "Admin";

        }

    }

}
