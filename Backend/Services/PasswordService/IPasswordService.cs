namespace Backend.Services;
public interface IPasswordService
{
    string HashPassword(string plainPassword);
    bool VerifyPassword(string plainPassword, string storedHash);
}