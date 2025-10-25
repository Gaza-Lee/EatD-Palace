using Backend.Data;
using Backend.Dtos;
using Backend.Entities;
using Backend.Mapping;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Endpoints;

public static class AuthEndpoints
{
    public static RouteGroupBuilder MapAuthEndpoints(this WebApplication app)
    {
        var authGroup = app.MapGroup("auth");

        //REGISTER
        authGroup.MapPost("/register", async (
            RestaurantDbContext dbContext,
            IPasswordService passwordService,
            [FromBody] CreateUserDto newUser) =>
        {
            // Check if user already exists
            var emailExists = await dbContext.Users.AnyAsync(u => u.Email == newUser.Email);
            var phoneExists = await dbContext.Users.AnyAsync(u => u.PhoneNumber == newUser.PhoneNumber);

            if (emailExists)
                return Results.BadRequest("Email already exists.");

            if (phoneExists)
                return Results.BadRequest("Phone number already exists.");

            // Hash the password
            var hashedPassword = passwordService.HashPassword(newUser.Password);

            // Create new user entity
            var user = new User
            {
                Username = newUser.Username,
                Email = newUser.Email,
                PhoneNumber = newUser.PhoneNumber,
                PasswordHash = hashedPassword,
                Role = "User"
            };

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            return Results.Ok(new
            {
                Message = "Registration successful",
                User = user.ToUserDto()
            });
        });

        //LOGIN
        authGroup.MapPost("/login", async (
            RestaurantDbContext dbContext,
            IPasswordService passwordService,
            [FromBody] LoginDto loginDto) =>
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u =>
                u.Email == loginDto.UserPhoneOrEmail || u.PhoneNumber == loginDto.UserPhoneOrEmail);

            if (user is null)
                return Results.NotFound("User not found.");

            if (!passwordService.VerifyPassword(loginDto.Password, user.PasswordHash))
                return Results.BadRequest("Invalid password.");

            return Results.Ok(new
            {
                Message = "Login successful",
                User = user.ToUserDto()
            });
        });

        //GET /auth/me...(Getting user profile)
        authGroup.MapGet("/me/{id:int}", async (RestaurantDbContext dbContext, int id) =>
        {
            var user = await dbContext.Users.FindAsync(id);
            if (user is null)
                return Results.NotFound("User not found");

            return Results.Ok(user.ToUserDto());
        });

        //PUT /auth/me/{id} User updating user profile
        authGroup.MapPut("/me/{id:int}", async (
            int id,
            [FromBody] UpdateProfileDto updateProfile,
            RestaurantDbContext dbContext,
            IPasswordService passwordService) =>
        {
            var user = await dbContext.Users.FindAsync(id);
            if (user is null)
                return Results.NotFound("User not found");

            user.UpdateProfileEntity(updateProfile, passwordService);
            await dbContext.SaveChangesAsync();

            return Results.Ok(new
            {
                Message = "Profile updated successfully",
                User = user.ToUserDto()
            });

        });
        return authGroup;
    }
}
