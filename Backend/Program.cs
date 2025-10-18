using Backend.Data;
using Backend.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Restaurant");
builder.Services.AddSqlite<RestaurantDbContext>(connectionString);

var app = builder.Build();

app.MapFoodEndpoints();
await app.MigrateDbAsync();
app.Run();
