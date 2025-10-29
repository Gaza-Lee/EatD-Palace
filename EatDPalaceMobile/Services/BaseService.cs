using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EatDPalaceMobile.Services
{
    public abstract class BaseService
    {
        protected readonly HttpClient _httpClient;

        protected BaseService()
        {
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("http://localhost:5134/")
            };

            _httpClient.DefaultRequestHeaders.Accept.Add(
                new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }

        protected void SetBearerToken(string? token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                _httpClient.DefaultRequestHeaders.Authorization = null;
            }
            else
            {
                _httpClient.DefaultRequestHeaders.Authorization = 
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }
        }

        protected async Task<T?> GetAsync<T>(string endpoint)
        {
            if (!IsInternetAvailable()) return default;

            try
            {
                var response = await _httpClient.GetAsync(endpoint);
                await EnsureSuccessWithAlert(response);

                var json = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(json);
            }
            catch (Exception ex)
            {
                await ShowErrorAlert($"GET {endpoint} failed", ex.Message);
                return default;
            }
        }

        protected async Task<T?> PostAsync<T>(string endpoint, object data)
        {
            if (!IsInternetAvailable()) return default;

            try
            {
                var json = JsonConvert.SerializeObject(data); // 👈 Newtonsoft
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(endpoint, content);
                await EnsureSuccessWithAlert(response);

                var responseJson = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(responseJson); // 👈 Newtonsoft
            }
            catch (Exception ex)
            {
                await ShowErrorAlert($"POST {endpoint} failed", ex.Message);
                return default;
            }
        }

        protected async Task<T?> PutAsync<T>(string endpoint, object data)
        {
            if (!IsInternetAvailable()) return default;

            try
            {
                var json = JsonConvert.SerializeObject(data);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PutAsync(endpoint, content);
                await EnsureSuccessWithAlert(response);

                var responseJson = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(responseJson);
            }
            catch (Exception ex)
            {
                await ShowErrorAlert($"PUT {endpoint} failed", ex.Message);
                return default;
            }
        }

        protected async Task<bool> DeleteAsync(string endpoint)
        {
            if (!IsInternetAvailable()) return false;

            try
            {
                var response = await _httpClient.DeleteAsync(endpoint);
                await EnsureSuccessWithAlert(response);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                await ShowErrorAlert($"DELETE {endpoint} failed", ex.Message);
                return false;
            }
        }

        #region Connectivity & Alerts
        private bool IsInternetAvailable()
        {
            var access = Connectivity.NetworkAccess;

            if (access != NetworkAccess.Internet)
            {
                MainThread.BeginInvokeOnMainThread(async () =>
                {
                    if (access == NetworkAccess.ConstrainedInternet)
                        await Shell.Current.DisplayAlert("Limited Connection", "You have limited internet access.", "OK");
                    else
                        await Shell.Current.DisplayAlert("No Internet", "Please check your connection and try again.", "OK");
                });

                return false;
            }

            return true;
        }

        private async Task EnsureSuccessWithAlert(HttpResponseMessage response)
        {
            if (!response.IsSuccessStatusCode)
            {
                var reason = await response.Content.ReadAsStringAsync();
                await ShowErrorAlert($"Server Error ({(int)response.StatusCode})", reason);
                response.EnsureSuccessStatusCode();
            }
        }

        private async Task ShowErrorAlert(string title, string message)
        {
            System.Diagnostics.Debug.WriteLine($"[{title}] {message}");

            if (Shell.Current?.Handler?.MauiContext != null)
            {
                await Shell.Current.Dispatcher.DispatchAsync(async () =>
                {
                    await Shell.Current.DisplayAlert(title, message, "OK");
                });
            }
        }
        #endregion
    }
}
