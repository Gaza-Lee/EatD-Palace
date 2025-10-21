using Backend.Data;
using Backend.Dtos;
using Backend.Entities;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Backend.Endpoints;

public static class CategoryEndpoints
{
    const string GetCategoryEndpoint = "GetCategory";

    public static async Task<RouteGroupBuilder> MapCategoryEndpoints(this WebApplication app)
    {
        var categoryGroup = app.MapGroup("categories").WithParameterValidation();

        //GET /categories
        categoryGroup.MapGet("/", async (RestaurantDbContext dbContext) =>
            await dbContext.Categories.Select(category => category.ToCategoryDto())
            .AsNoTracking().ToListAsync());

        //GET /id (Single category)
        categoryGroup.MapGet("/{id}", async (RestaurantDbContext dbContext, int id) =>
        {
            Category? category = await dbContext.Categories.FindAsync(id);
            return Results.NotFound();
        });

        //POST /category
        categoryGroup.MapPost("/", async (RestaurantDbContext dbContext, CreateCategoryDto newCategory) =>
        {
            Category category = newCategory.ToEntity();

            dbContext.Categories.Add(category);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(GetCategoryEndpoint, new { id = category.Id }, category.ToCategoryDto());
        });

        //PUT /category
        categoryGroup.MapPut("/", async (RestaurantDbContext dbContext, int id, UpdateCategoryDto updateCategory) =>
        {
            var existingCategory = await dbContext.Categories.FindAsync(id);

            if (existingCategory is null)
                return Results.NotFound();

            dbContext.Entry(existingCategory).CurrentValues.SetValues(updateCategory.ToEntity(id));

            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        });

        //DELETE /category
        categoryGroup.MapDelete("/", async (RestaurantDbContext dbContext, int id) =>
        {
            await dbContext.Categories.Where(category => category.Id == id).ExecuteDeleteAsync();
            return Results.NoContent();
        });
        return categoryGroup;
    }
}