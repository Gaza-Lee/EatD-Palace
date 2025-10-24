using Backend.Data;
using Backend.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Restaurant");
builder.Services.AddSqlite<RestaurantDbContext>(connectionString);

var app = builder.Build();

//EndPoints
app.MapFoodEndpoints();
app.MapCategoryEndpoints();
app.MapUserEndpoints();

//Migrate DB
await app.MigrateDbAsync();
app.Run();
