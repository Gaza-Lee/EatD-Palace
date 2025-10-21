using Backend.Dtos;
using Backend.Entities;

namespace Backend.Mapping;

public static class UserMapping
{
    public static UserDetailsDto ToUserDto(this User user) =>
        new(user.Id, user.Username, user.Email, user.PhoneNumber, user.Role, user.CreatedAt);

    public static User ToEntity(this CreateUserDto user)
    {
        return new()
        {
            Username = user.Username,
            PhoneNumber = user.PhoneNumber,
            Email = user.Email,
            PasswordHash = BCrypt(user.Password)
        }
    }
}