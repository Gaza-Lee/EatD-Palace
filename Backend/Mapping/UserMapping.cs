using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
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
            PasswordHash = HashPassword(user.Password)
        };
    }

    public static void UpdateUserEntitiy(this User user, updateUserDto updateUserDto)
    {
        if (!string.IsNullOrWhiteSpace(updateUserDto.Username))
            user.Username = updateUserDto.Username;

        if (!string.IsNullOrWhiteSpace(updateUserDto.PhoneNumber))
            user.PhoneNumber = updateUserDto.PhoneNumber;

        if (!string.IsNullOrWhiteSpace(updateUserDto.Email))
            user.Email = updateUserDto.Email;

        if (!string.IsNullOrWhiteSpace(updateUserDto.Password))
            user.PasswordHash = updateUserDto.Password;
        if (!string.IsNullOrWhiteSpace(updateUserDto.Role))
            user.Role = user.Role;
    }


    //SHA to hash Password
    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}