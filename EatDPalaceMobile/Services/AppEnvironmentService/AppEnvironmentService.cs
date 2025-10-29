using EatDPalaceMobile.Services.IdentityService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Services.AppEnvironmentService
{
    public class AppEnvironmentService : IAppEnvironmentService
    {
        public IIdentityService IdentityService { get; }
        public IAuthorizationService AuthorizationService { get; }

        public bool IsInitialized { get; private set; }

        public AppEnvironmentService(IIdentityService identityService, IAuthorizationService authorizationService)
        {
            IdentityService = identityService;
            AuthorizationService = authorizationService;
        }

        public async Task InitializeAsync()
        {
            // Optional: Preload user if you have saved credentials
            await IdentityService.LoginAsync(); // auto-login from saved creds

            IsInitialized = true;
        }
    }
}
