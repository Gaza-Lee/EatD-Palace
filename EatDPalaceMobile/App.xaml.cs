using EatDPalaceMobile.Services.AppEnvironmentService;
using EatDPalaceMobile.Services.NavigationService;
using System.Diagnostics;
using System.Threading.Tasks;
using EatDPalaceMobile.Views.GeneralPages;

namespace EatDPalaceMobile
{
    
    public partial class App : Application
    {
        private readonly INavigationService _navigationService;
        private readonly IAppEnvironmentService _appEnvironmentService;
        public App(INavigationService navigationService, IAppEnvironmentService appEnvironmentService)
        {
            InitializeComponent();
            _navigationService = navigationService;
            _appEnvironmentService = appEnvironmentService;
        }

        protected override Window CreateWindow(IActivationState? activationState)
        {
            return new Window(new AppShell());
        }

        protected override async void OnStart()
        {
            base.OnStart();
            await _navigationService.InitializeAsync();
            await _appEnvironmentService.InitializeAsync();
        }
    }
}