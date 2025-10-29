using CommunityToolkit.Maui;
using EatDPalaceMobile.Services.AppEnvironmentService;
using EatDPalaceMobile.Services.IdentityService;
using EatDPalaceMobile.Services.NavigationService;
using EatDPalaceMobile.ViewModels.GeneralPagesViewModels;
using EatDPalaceMobile.Views.GeneralPages;
using EatDPalaceMobile.Views.UserOnly;
using Microsoft.Extensions.Logging;

namespace EatDPalaceMobile
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .UseMauiCommunityToolkit()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("Montserrat-Regular.ttf", "MontserratSemiBold");
                    fonts.AddFont("Roboto-Regular.ttf", "RobotoRegular");
                    fonts.AddFont("Roboto_Condensed-Regular.ttf", "RobotoRegular");
                    fonts.AddFont("Finlandica-Regular.ttf", "FinlandicaRegular");
                    fonts.AddFont("Montserrat-Bold.ttf", "MontserratBold");
                    fonts.AddFont("Montserrat-SemiBold.ttf", "MontserratSemiBold");
                    fonts.AddFont("MaterialIcons-Regular.ttf", "MaterialIcon");
                });
#if DEBUG
            builder.Logging.AddDebug();
#endif
            builder.RegisterServices();
            builder.RegisterViews();
            builder.RegisterViewModels();
            return builder.Build();
        }

        public static MauiAppBuilder RegisterServices(this MauiAppBuilder builder)
        {
            var s = builder.Services;
            // Register services here
            s.AddSingleton<IAppEnvironmentService, AppEnvironmentService>();
            s.AddSingleton<INavigationService, NavigationService>();
            s.AddSingleton<IIdentityService, IdentityService>();
            s.AddSingleton<IAuthorizationService, AuthorizationService>();

            return builder;
        }

        public static MauiAppBuilder RegisterViewModels(this MauiAppBuilder builder)
        {
            var vM = builder.Services;
            //Register view models
            vM.AddTransient<LandingPageViewModel>();
            vM.AddTransient<LoginPageViewModel>();
            vM.AddTransient<CreateAccountViewModel>();

            return builder;
        }

        public static MauiAppBuilder RegisterViews(this MauiAppBuilder builder)
        {
            var pG = builder.Services;
            pG.AddTransient<LandingPage>();
            pG.AddTransient<CreateAccountPage>();
            pG.AddTransient<LoginPage>();
            pG.AddTransient<UserHomePage>();
            return builder;
        }
    }
}
