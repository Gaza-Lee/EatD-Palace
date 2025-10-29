using EatDPalaceMobile.ViewModels.GeneralPagesViewModels;

namespace EatDPalaceMobile.Views.GeneralPages;

public partial class LoginPage : ContentPage
{
	private readonly LoginPageViewModel _loginPageViewModel;
	public LoginPage(LoginPageViewModel loginPageViewModel)
	{
		InitializeComponent();
		_loginPageViewModel = loginPageViewModel;
		BindingContext = _loginPageViewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
		if (!_loginPageViewModel.IsInitialized)
		{
			await _loginPageViewModel.InitializeAsyncCommand.ExecuteAsync(null);
        }
    }
}