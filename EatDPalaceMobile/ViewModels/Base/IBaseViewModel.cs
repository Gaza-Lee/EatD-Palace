using CommunityToolkit.Mvvm.Input;
using EatDPalaceMobile.Services.NavigationService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.ViewModels.Base
{
    public interface IBaseViewModel : IQueryAttributable
    {
        public INavigationService NavigationService { get; }

        public IAsyncRelayCommand InitializeAsyncCommand { get; }

        public bool IsBusy { get; }

        public bool IsInitialized { get; }

        Task InitializeAsync();
    }
}
