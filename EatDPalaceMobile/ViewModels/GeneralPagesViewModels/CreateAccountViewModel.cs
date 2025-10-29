using CommunityToolkit.Mvvm.Input;
using EatDPalaceMobile.Services.NavigationService;
using EatDPalaceMobile.ViewModels.Base;
using System.Diagnostics;

namespace EatDPalaceMobile.ViewModels.GeneralPagesViewModels
{
    public partial class CreateAccountViewModel : BaseViewModel
    {
        public CreateAccountViewModel(INavigationService navigationService)
            : base(navigationService)
        {
        }

        [RelayCommand]
        private async Task CreateAccountAsync()
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

        [RelayCommand]
        private async Task ReturnToLoginPageAsync()
        {
            try
            {
                await NavigationService.PopAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Navigation back to LoginPage failed: {ex.Message}");
            }
        }
    }
}
