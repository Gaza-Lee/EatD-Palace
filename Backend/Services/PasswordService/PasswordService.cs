namespace Backend.Services;

public class PasswordService : IPasswordService
{
    public string HashPassword(string plainPassword)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var bytes = System.Text.Encoding.UTF8.GetBytes(plainPassword);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }

    public bool VerifyPassword(string plainPassword, string storedHash)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var bytes = System.Text.Encoding.UTF8.GetBytes(plainPassword);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash) == storedHash;
    }
}