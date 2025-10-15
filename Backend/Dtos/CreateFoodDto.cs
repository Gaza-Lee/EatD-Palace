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
