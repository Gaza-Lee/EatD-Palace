using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Backend.Dtos;
using Backend.Services;
using Backend.Entities;

namespace Backend.Mapping;

public static class UserMapping
{
    public static UserDetailsDto ToUserDto(this User user) =>
        new(user.Id, user.Username, user.Email, user.PhoneNumber, user.Role, user.CreatedAt);

    public static User ToEntity(this CreateUserDto user, IPasswordService passwordService)
    {
        return new()
        {
            Username = user.Username,
            PhoneNumber = user.PhoneNumber,
            Email = user.Email,
            PasswordHash =passwordService.HashPassword(user.Password)
        };
    }


    public static void UpdateProfileEntity(this User user, UpdateProfileDto updateProfileDto, IPasswordService passwordService)
    {
        if (!string.IsNullOrWhiteSpace(updateProfileDto.Username))
            user.Username = updateProfileDto.Username;

        if (!string.IsNullOrWhiteSpace(updateProfileDto.PhoneNumber))
            user.PhoneNumber = updateProfileDto.PhoneNumber;

        if (!string.IsNullOrWhiteSpace(updateProfileDto.Email))
            user.Email = updateProfileDto.Email;

        if (!string.IsNullOrWhiteSpace(updateProfileDto.Password))
            user.PasswordHash = passwordService.HashPassword(updateProfileDto.Password);
    }
    public static void UpdateUserEntitiy(this User user, updateUserDto updateUserDto, IPasswordService passwordService)
    {
        var profileDto = new UpdateProfileDto(updateUserDto.Username, updateUserDto.Email, updateUserDto.PhoneNumber, updateUserDto.Password);
        user.UpdateProfileEntity(profileDto, passwordService);
        if (!string.IsNullOrWhiteSpace(updateUserDto.Role))
            user.Role = updateUserDto.Role;
    }
}