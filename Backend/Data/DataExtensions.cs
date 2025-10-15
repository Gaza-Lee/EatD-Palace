using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public static class DataExtentions
{
    public static async Task MigrateDbAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<RestaurantDbContext>();
        await dbContext.Database.MigrateAsync();
    }
}