using System.Security.Cryptography.X509Certificates;

namespace EatDPalaceMobile.Services.IdentityService
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly IIdentityService _identityService;
        public AuthorizationService(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public bool CanAccessRoute(string route)
        {
            var user = _identityService.CurrentUser;

            if (user == null)
            {
                return route.StartsWith("//LandingPage")
                    || route.StartsWith("//HomePage");
            }

            var AdminRoutes = new List<string>
            {
                "//AdminHome",
                "//UserManagement",
                "//Settings"
            };

            if (AdminRoutes.Any(adminRoute => route.StartsWith(adminRoute)) && user.Role != "Admin")
                return false;
            return true;
        }

        public bool IsInRole(string role)
        {
            return _identityService.CurrentUser?.Role == role;
        }
    }
}
