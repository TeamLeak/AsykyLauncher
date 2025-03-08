using Microsoft.Maui.Controls;
using System;
using System.Threading.Tasks;
using MauiApp3.Services.Providers;

namespace MauiApp3
{
    public partial class MainPage : ContentPage
    {
        private bool _isProcessing;

        public MainPage()
        {
            InitializeComponent();
            SetupControls();
            CheckSession();
        }

        private void SetupControls()
        {
            UsernameEntry.TextChanged += (s, e) => ClearError();
            PasswordEntry.TextChanged += (s, e) => ClearError();
        }

        private async void CheckSession()
        {
            var sessionManager = SessionProvider.GetSessionManager();
            string? jwt = sessionManager.GetSession();

            if (!string.IsNullOrEmpty(jwt) && MainPage.ValidateSession(jwt))
            {
                await NavigateToMain();
            }
        }

        private static bool ValidateSession(string jwt)
        {
            // Здесь можно добавить проверку на срок действия JWT
            return true; // Пока просто пропускаем без проверки
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            if (_isProcessing) return;

            try
            {
                _isProcessing = true;
                await ProcessLogin();
            }
            finally
            {
                _isProcessing = false;
            }
        }

        private async Task ProcessLogin()
        {
            // Валидация
            if (!ValidateInput())
                return;

            // Визуальная обратная связь
            await LoginButton.ScaleTo(0.95, 100);
            LoginButton.IsEnabled = false;
            StatusLabel.IsVisible = true;
            StatusLabel.Text = "Подключаюсь...";

            // Имитация процесса аутентификации
            await Task.Delay(800);
            StatusLabel.Text = "Проверяю данные...";
            await Task.Delay(1200);

            // Создание сессии
            var sessionManager = SessionProvider.GetSessionManager();
            sessionManager.CreateSession("your.jwt.token");

            // Успешный вход
            await NavigateToMain();
        }

        private bool ValidateInput()
        {
            if (string.IsNullOrWhiteSpace(UsernameEntry.Text))
            {
                ShowError("Укажите имя пользователя!");
                return false;
            }

            if (string.IsNullOrWhiteSpace(PasswordEntry.Text))
            {
                ShowError("Укажите пароль!");
                return false;
            }

            return true;
        }

        private async void ShowError(string message)
        {
            StatusLabel.Text = message;
            StatusLabel.IsVisible = true;
            await StatusLabel.TranslateTo(-5, 0, 50);
            await StatusLabel.TranslateTo(5, 0, 50);
            await StatusLabel.TranslateTo(0, 0, 50);
        }

        private void ClearError()
        {
            StatusLabel.IsVisible = false;
        }

        private async Task NavigateToMain()
        {
            // Простая навигация без Shell
            await LoginButton.ScaleTo(1, 200);
            await Content.FadeTo(0, 400);

            //var mainPage = new MainGamePage();
            //await Navigation.PushAsync(mainPage);
            //Navigation.RemovePage(this);
        }
    }
}