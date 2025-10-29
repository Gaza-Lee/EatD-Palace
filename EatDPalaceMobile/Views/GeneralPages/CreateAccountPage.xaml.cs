using EatDPalaceMobile.ViewModels.GeneralPagesViewModels;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Views.GeneralPages;

public partial class CreateAccountPage : ContentPage
{
	private readonly CreateAccountViewModel _createAccountViewModel;
    public CreateAccountPage(CreateAccountViewModel createAccountViewModel)
	{
		InitializeComponent();
		_createAccountViewModel = createAccountViewModel;
		BindingContext = _createAccountViewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        if (!_createAccountViewModel.IsInitialized)
        {
            await _createAccountViewModel.InitializeAsyncCommand.ExecuteAsync(null);
        }
    }
}