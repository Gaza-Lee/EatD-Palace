using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using EatDPalaceMobile.Models.Categories;
using EatDPalaceMobile.Services.NavigationService;
using EatDPalaceMobile.ViewModels.Base;
using System.Collections.ObjectModel;
using System.Diagnostics;

namespace EatDPalaceMobile.ViewModels.GeneralPagesViewModels
{
    public partial class LandingPageViewModel : BaseViewModel
    {
        [ObservableProperty]
        private ObservableCollection<CarouselItem> carouselItems;

        [ObservableProperty]
        private int currentPosition;

        [ObservableProperty]
        private CarouselItem currentItem;

        public LandingPageViewModel(INavigationService navigationService)
            : base(navigationService)
        {
        }

        public override async Task InitializeAsync()
        {
            await IsBusyFor(async () =>
            {
                await LoadCarouselItems();
            });
        }

        private async Task LoadCarouselItems()
        {

            CarouselItems = new ObservableCollection<CarouselItem>
            {
                new CarouselItem { ImageUrl = "bgimg2.png", Title = "Fried Rice", Description = "Delicious fried rice with vegetables" },
                new CarouselItem { ImageUrl = "bgimg3.png", Title = "Waakye", Description = "Traditional Ghanaian dish" },
                new CarouselItem { ImageUrl = "bgimg2.png", Title = "Banku & Tilapia", Description = "Classic Ghanaian combo" },
                new CarouselItem { ImageUrl = "bgimg4.png", Title = "Special Fried Rice", Description = "Chef's special recipe" },
                new CarouselItem { ImageUrl = "bgimg3.jpg", Title = "Fufu", Description = "Traditional African staple" },
                new CarouselItem { ImageUrl = "bgimg2.png", Title = "Vegetable Fried Rice", Description = "Healthy vegetarian option" }
            };

            if (CarouselItems.Any())
            {
                CurrentPosition = 0;
                CurrentItem = CarouselItems[0];
            }
        }

        [RelayCommand]
        private async Task NavigateToLoginPageAsync()
        {
            try
            {
                await NavigationService.NavigateToAsync("LoginPage");
            }
            catch (Exception ex)
            {

                Debug.WriteLine($"Navigation to LoginPage failed: {ex.Message}");
            }
        }
    }
}