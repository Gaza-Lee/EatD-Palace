using EatDPalaceMobile.Views.GeneralPages;
using EatDPalaceMobile.Views.UserOnly;

namespace EatDPalaceMobile
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();

            Routing.RegisterRoute("LandingPage", typeof(LandingPage));
            Routing.RegisterRoute("CreateAccountPage", typeof(CreateAccountPage));
            Routing.RegisterRoute("LoginPage", typeof(LoginPage));
            Routing.RegisterRoute("UserHomePage", typeof(UserHomePage));
        }
    }
}
