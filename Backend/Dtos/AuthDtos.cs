namespace Backend.Dtos;
public record LoginDto(
    string UserPhoneOrEmail,
    string Password
);