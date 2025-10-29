using EatDPalaceMobile.Services.IdentityService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Services.AppEnvironmentService
{
    public interface IAppEnvironmentService
    {
        Task InitializeAsync();
        bool IsInitialized { get; }
        IIdentityService IdentityService { get; }
        IAuthorizationService AuthorizationService { get; }
    }
}
