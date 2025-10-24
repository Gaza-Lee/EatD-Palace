using Backend.Data;
using Backend.Dtos;
using Backend.Entities;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Backend.Endpoints;

public static class UserEndPoints
{
    const string GetUserEndpointName = "GetUser";

    public static RouteGroupBuilder MapUserEndpoints(this WebApplication app)
    {
        var userGroup = app.MapGroup("users").WithParameterValidation();

        //GET /Users
        userGroup.MapGet("/", async (RestaurantDbContext dbContext) =>
            await dbContext.Users.Select(user => user.ToUserDto()).AsNoTracking().ToListAsync());


        //Get /{id} (Get single User)
        userGroup.MapGet("/{id}", async (RestaurantDbContext dbContext, int id) =>
        {
            User? user = await dbContext.Users.FindAsync(id);
            return user is null ? Results.NotFound() : Results.Ok(user.ToUserDto());
        }).WithName(GetUserEndpointName);

        //POST /user
        userGroup.MapPost("/", async (RestaurantDbContext dbContext, CreateUserDto newUser) =>
        {
            if (await dbContext.Users.AnyAsync(user => user.Email == newUser.Email || user.PhoneNumber == newUser.PhoneNumber))
                return Results.BadRequest("User alreeady exists");

            var user = newUser.ToEntity();
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(GetUserEndpointName, new { id = user.Id }, user.ToUserDto());
        });

        //PUT /user
        userGroup.MapPut("/{id}", async (RestaurantDbContext dbContext, int id, updateUserDto updateUser) =>
        {
            var userExist = await dbContext.Users.FindAsync(id);
            if (userExist is null)
                return Results.NotFound();

            userExist.UpdateUserEntitiy(updateUser);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        //Delete /user
        userGroup.MapDelete("/{id}", async (RestaurantDbContext dbContext, int id) =>
        {
            await dbContext.Users.Where(user => user.Id == id).ExecuteDeleteAsync();
            return Results.NoContent();
        });
        return userGroup;
    }
}