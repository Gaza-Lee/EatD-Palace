using Backend.Data;
using Backend.Endpoints;
using Backend.Services;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Restaurant");
builder.Services.AddSqlite<RestaurantDbContext>(connectionString);

//Services
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://127.0.0.1:5500"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

//Frontend permission
app.UseCors("AllowFrontend");
//EndPoints
app.MapFoodEndpoints();
app.MapCategoryEndpoints();
app.MapUserEndpoints();
app.MapAuthEndpoints();

//Migrate DB
await app.MigrateDbAsync();
app.Run();
