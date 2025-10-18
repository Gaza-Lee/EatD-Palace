using Backend.Data;
using Backend.Dtos;
using Backend.Entities;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Backend.Endpoints;
public static class FoodEndpoints
{
    const string GetFoodEndpointName = "GetFood";

    public static RouteGroupBuilder MapFoodEndpoints(this WebApplication app)
    {
        var foodGroup = app.MapGroup("foods").WithParameterValidation();

        //GET: /foods
        foodGroup.MapGet("/", async (RestaurantDbContext dbContext) => await dbContext.Foods
            .Include(food => food.Category).Select(food => food.ToFoodDetailsDto()).AsNoTracking().ToListAsync());

        //GET: /food/{id}
        foodGroup.MapGet("/{id}", async (int id, RestaurantDbContext dbContext) =>
        {
            Food? food = await dbContext.Foods.FindAsync(id);
            return food is null ? Results.NotFound() : Results.Ok(food.ToFoodDetailsDto());
        })
        .WithName(GetFoodEndpointName);


        //POST /food
        foodGroup.MapPost("/", async (CreateFoodDto newFood, RestaurantDbContext dbContext) =>
        {
            var category = await dbContext.Categories.FindAsync(newFood.CategoryId);
            if (category is null)
                return Results.BadRequest("Invalid Category");

            Food food = newFood.ToFoodEntity();
            dbContext.Foods.Add(food);
            await dbContext.SaveChangesAsync();
            return Results.CreatedAtRoute(GetFoodEndpointName, new { id = food.Id }, food.ToFoodDetailsDto());
        });

        //PUT /food
        foodGroup.MapPut("/{id}", async (int id, UpdateFoodDto updateFood, RestaurantDbContext dbContext) =>
        {
            var existingFood = await dbContext.Foods.FindAsync(id);
            if (existingFood is null)
                return Results.NotFound();

            dbContext.Entry(existingFood).CurrentValues.SetValues(updateFood.ToEntity(id));

            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        });
        return foodGroup;
    }
}