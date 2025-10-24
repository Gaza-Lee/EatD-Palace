using Backend.Data;
using Backend.Endpoints;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Restaurant");
builder.Services.AddSqlite<RestaurantDbContext>(connectionString);

//Services
builder.Services.AddScoped<IPasswordService, PasswordService>();

var app = builder.Build();

//EndPoints
app.MapFoodEndpoints();
app.MapCategoryEndpoints();
app.MapUserEndpoints();
app.MapAuthEndpoints();

//Migrate DB
await app.MigrateDbAsync();
app.Run();
