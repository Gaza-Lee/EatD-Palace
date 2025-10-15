using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Restaurant");
builder.Services.AddSqlite<RestaurantDbContext>(connectionString);


var app = builder.Build();


await app.MigrateDbAsync();
app.Run();
