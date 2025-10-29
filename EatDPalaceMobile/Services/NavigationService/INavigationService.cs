using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Services.NavigationService
{
    public interface INavigationService
    {
        Task InitializeAsync();
        Task NavigateToAsync(string route, Dictionary<string, object>? parameters = null);
        Task PopAsync();
    }
}
