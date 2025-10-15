
namespace Backend.Entities;

public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Food> Foods { get; set; } = new();

}

