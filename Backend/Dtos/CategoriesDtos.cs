namespace Backend.Dtos;

public record CatergoryDetailsDto
(
    int Id,
    string Name
);

public record CreateCategoryDto(
    string Name
);

public record UpdateCategoryDto
(
    string Name
);

public record CategoryWithFoodsDto(
    int Id,
    string Name,
    List<FoodDetailsDto> Foods
);