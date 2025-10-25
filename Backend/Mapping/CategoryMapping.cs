using System.Reflection.Metadata;
using Backend.Dtos;
using Backend.Entities;
namespace Backend.Mapping;

public static class CategoryMapping
{
    public static CatergoryDetailsDto ToCategoryDto(this Category category) =>
        new(category.Id, category.Name);

    public static Category ToEntity(this CreateCategoryDto newCategory) => new()
    {
        Name = newCategory.Name
    };

    public static Category ToEntity(this UpdateCategoryDto updateCategory, int id)
    {
        return new Category()
        {
            Id = id,
            Name = updateCategory.Name,
        };
    }

   public static CategoryWithFoodsDto ToCategoryWithFoodsDto(this Category category) =>
    new(
        category.Id,
        category.Name,
        category.Foods?.Select(f => f.ToFoodDetailsDto()).ToList() ?? []
    );

}