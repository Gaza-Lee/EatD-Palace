using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Models.User
{
    public class LoginResponse
    {
        public string? Message { get; set; }
        public UserDetails? User { get; set; }
    }
}
