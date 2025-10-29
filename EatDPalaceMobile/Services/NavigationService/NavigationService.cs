using EatDPalaceMobile.Services.AppEnvironmentService;
using EatDPalaceMobile.Services.IdentityService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Services.NavigationService
{
    public class NavigationService : INavigationService
    {
        private readonly IAppEnvironmentService _appEnvironmentService;
        private readonly IIdentityService _identityService;

        public NavigationService(IAppEnvironmentService appEnvironmentService, IIdentityService identityService)
        {
            _appEnvironmentService = appEnvironmentService;
            _identityService = identityService;
        }
        
        public async Task InitializeAsync()
        {
            var currentUser = _appEnvironmentService.IdentityService.CurrentUser;

            if (currentUser == null)
            {
                await NavigateToAsync("LandingPage");
                return;
            }

            if(currentUser.Role == "Admin" && _identityService.IsAuthenticated)
            {
                await NavigateToAsync("//AdminHomePage");
            }
            else if (currentUser.Role != null && _identityService.IsAuthenticated)
            {
                await NavigateToAsync("//UserHomePage");
            }
        }

        public Task NavigateToAsync(string route, Dictionary<string, object>? routeParameters = null)
        {
            var shellNavigation = new ShellNavigationState(route);

            return routeParameters != null
                ?Shell.Current.GoToAsync(shellNavigation, routeParameters)
                : Shell.Current.GoToAsync(shellNavigation);
        }

        public Task PopAsync() => Shell.Current.GoToAsync("..");
    }      
}
