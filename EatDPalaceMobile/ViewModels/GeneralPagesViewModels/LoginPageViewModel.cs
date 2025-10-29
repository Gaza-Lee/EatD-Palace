using CommunityToolkit.Mvvm.Input;
using EatDPalaceMobile.Services.NavigationService;
using EatDPalaceMobile.ViewModels.Base;
using System.Diagnostics;

namespace EatDPalaceMobile.ViewModels.GeneralPagesViewModels
{
    public partial class LoginPageViewModel : BaseViewModel
    {
        public LoginPageViewModel(INavigationService navigationService)
            : base(navigationService)
        {
        }

        [RelayCommand]
        private async Task NavigateToCreateAccountAsync()
        {
            try
            {
                await NavigationService.NavigateToAsync("CreateAccountPage");
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Navigation to CreateAccountPage failed: {ex.Message}");
            }
        }

        [RelayCommand]
        private async Task LoginAsync()
        {
            try
            {
                await NavigationService.NavigateToAsync("//UserMain");
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Navigation to UserHomePage failed: {ex.Message}");
            }
        }
    }
}
