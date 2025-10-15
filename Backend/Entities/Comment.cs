namespace Backend.Entities;
public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; } = default!;
    public int Rating { get; set; }
    public DateTime CreatedDate { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public int? FoodId { get; set; }
    public Food? Food { get; set; }
}
