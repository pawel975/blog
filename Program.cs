using Blog;
using Blog.Entities;
using Blog.Middleware;
using Blog.Models;
using Blog.Models.Validators;
using Blog.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<BlogSeeder>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddDbContext<BlogDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IBlogPostService, BlogPostService>();

// Validators
builder.Services.AddControllers().AddFluentValidation();
builder.Services.AddScoped<IValidator<CreateBlogPostDto>, CreateBlogPostDtoValidator>();
builder.Services.AddScoped<IValidator<UpdateBlogPostDto>, UpdateBlogPostDtoValidator>();
var app = builder.Build();

// Seed data
var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<BlogSeeder>();

app.UseResponseCaching();
seeder.Seed();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();



