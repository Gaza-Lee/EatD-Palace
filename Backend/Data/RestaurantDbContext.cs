using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class RestaurantDbContext(DbContextOptions<RestaurantDbContext> options)
    : DbContext(options)
{
    public DbSet<Food> Foods => Set<Food>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Comment> Comments => Set<Comment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Relationships
        modelBuilder.Entity<Category>()
            .HasMany(c => c.Foods)
            .WithOne(f => f.Category)
            .HasForeignKey(f => f.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Food>()
            .HasMany(f => f.Comments)
            .WithOne(c => c.Food)
            .HasForeignKey(c => c.FoodId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Comments)
            .WithOne(c => c.User)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Default values
        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasDefaultValue("User");

        modelBuilder.Entity<User>()
            .Property(u => u.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder.Entity<Category>().HasData(
            new { Id = 1, Name = "Main Dishes" },
            new { Id = 2, Name = "Desserts and Beverages" },
            new {Id = 3, Name = "Appetizers"}
        );
    }
}