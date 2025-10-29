using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Models.User
{
    public class LoginRequest
    {
        public string UserPhoneOrEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
