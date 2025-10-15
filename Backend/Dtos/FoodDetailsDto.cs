namespace Backend.Dtos;
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
