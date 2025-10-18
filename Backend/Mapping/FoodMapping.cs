using Backend.Entities;
using Backend.Dtos;

namespace Backend.Mapping;

public static class FoodMapping
{
    public static Food ToFoodEntity(this CreateFoodDto food)
    {
        return new Food()
        {
            Name = food.Name,
            Description = food.Description,
            Price = food.Price,
            ImageUrl = food.ImageUrl,
            CategoryId = food.CategoryId
        };
    }

    public static Food ToEntity(this UpdateFoodDto food, int id)
    {
        return new Food()
        {
            Id = id,
            Name = food.Name,
            Description = food.Description,
            Price = food.Price,
            ImageUrl = food.ImageUrl,
            CategoryId = food.CategoryId
        };
    }

    public static FoodDetailsDto ToFoodDetailsDto(this Food food)
    {
        return new FoodDetailsDto(
            food.Id,
            food.Name,
            food.Description,
            food.Price,
            food.ImageUrl,
            food.Category?.Name ?? "Uncategorized",
            food.Comments.Any() ? food.Comments.Average(c => c.Rating) : 0
        );
    }
}