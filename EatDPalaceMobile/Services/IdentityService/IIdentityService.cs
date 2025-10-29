using EatDPalaceMobile.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Services.IdentityService
{
    public interface IIdentityService
    {
        UserDetails? CurrentUser { get; }
        bool IsAuthenticated { get; }
        Task<bool> LoginAsync();
        Task LogOutAsync();
        Task<UserDetails> GetUserDetailsAsync();
    }
}
