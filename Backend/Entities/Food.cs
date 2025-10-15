namespace Backend.Entities;
public class Food
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string Description { get; set; } = default!;
    public decimal Price { get; set; }
    public required string ImageUrl { get; set; }

    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public List<Comment> Comments { get; set; } = new();
}
