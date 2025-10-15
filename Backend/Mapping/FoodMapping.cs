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

    public static FoodDetailsDto ToFoodDto(this Food food)
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

    public static void UpdateFromDto(this Food food, UpdateFoodDto dto)
    {
        food.Name = dto.Name;
        food.Description = dto.Description;
        food.Price = dto.Price;
        food.ImageUrl = dto.ImageUrl;
        food.CategoryId = dto.CategoryId;
    }


}