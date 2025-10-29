using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Services.IdentityService
{
    public interface IAuthorizationService
    {
        bool CanAccessRoute(string route);
        bool IsInRole(string role);
    }
}
