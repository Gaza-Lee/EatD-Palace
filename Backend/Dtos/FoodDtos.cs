using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public record CreateFoodDto
(
    [Required][StringLength(50)] string Name,
    [StringLength(400)] string Description,
    [Range(1, 500)] decimal Price,
    string ImageUrl,
    int CategoryId
);

public record FoodDetailsDto
(
    int Id,
    string Name,
    string Description,
    decimal Price,
    string ImageUrl,
    string CategoryName,
    double AverageRating
);

public record UpdateFoodDto(
    string Name,
    string Description,
    decimal Price,
    string ImageUrl,
    int CategoryId
);