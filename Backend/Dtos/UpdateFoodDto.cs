namespace Backend.Dtos;

public record UpdateFoodDto(
    string Name,
    string Description,
    decimal Price,
    string ImageUrl,
    int CategoryId
);