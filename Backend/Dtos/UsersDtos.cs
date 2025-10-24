namespace Backend.Dtos;

public record UserDetailsDto(
    int Id,
    string Username,
    string? Email,
    string? PhoneNumber,
    string Role,
    DateTime CreatedAt
);

public record CreateUserDto(
    string Username,
    string? Email,
    string? PhoneNumber,
    string Password
);

public record updateUserDto(
    string? Username,
    string? Email,
    string? PhoneNumber,
    string? Password,
    string? Role
);

public record UpdateProfileDto(
    string? Username,
    string? Email,
    string? PhoneNumber,
    string? Password
);