using EatDPalaceMobile.Models.User;
using System.Diagnostics;

namespace EatDPalaceMobile.Services.IdentityService
{
    public class IdentityService : BaseService, IIdentityService
    {
        private UserDetails? _currentUser;

        public UserDetails? CurrentUser => _currentUser;
        public bool IsAuthenticated => _currentUser != null;

        // Logs user in using email or phone number + password
        public async Task<bool> LoginAsync(string emailOrPhone, string password)
        {
            var loginRequest = new LoginRequest
            {
                UserPhoneOrEmail = emailOrPhone,
                Password = password
            };

            var response = await PostAsync<LoginResponse>("auth/login", loginRequest);

            // If no response or no user, login failed
            if (response?.User == null)
            {
                return false;
            }

            // Cache the user — session handled automatically by HttpClient cookies
            _currentUser = response.User;

            return true;
        }

        // Placeholder for auto-login (e.g., from saved credentials)
        public async Task<bool> LoginAsync() => false;

        // Logs user out — clears local state
        public async Task LogOutAsync()
        {
            //Call backend logout if endpoint added later
            // await PostAsync<object>("auth/logout", new { });

            // Clear cached user
            _currentUser = null;
        }

        // Returns current user (cached) — no network call unless you implement refresh
        public async Task<UserDetails> GetUserDetailsAsync()
        {
            return _currentUser ?? new UserDetails();
        }
    }
}