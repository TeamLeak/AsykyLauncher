using System.Collections.ObjectModel;
using MauiApp3.Services.Providers;
using System.Linq;

namespace MauiApp3
{
    public partial class SettingsPage : ContentPage
    {
        private ObservableCollection<string> _jvmParams;
        private string _activeBuild;
        private bool _loggingEnabled;
        private bool _developerModeEnabled;

        public SettingsPage()
        {
            InitializeComponent();

            _jvmParams = new ObservableCollection<string>();
            LoadJvmParams();
            LoadActiveBuild();
            LoadAdditionalSettings();

            BindingContext = this;

            RamSlider.ValueChanged += RamSlider_ValueChanged;
        }

        public ObservableCollection<string> JvmParams => _jvmParams;

        // Обновление параметра -Xmx при изменении слайдера
        private void RamSlider_ValueChanged(object sender, ValueChangedEventArgs e)
        {
            string xmxParam = $"-Xmx{(int)e.NewValue}M";
            UpdateOrAddXmxParam(xmxParam);
        }

        private void UpdateOrAddXmxParam(string xmxParam)
        {
            var existingParam = _jvmParams.FirstOrDefault(p => p.StartsWith("-Xmx"));
            if (existingParam != null)
            {
                _jvmParams[_jvmParams.IndexOf(existingParam)] = xmxParam;
            }
            else
            {
                _jvmParams.Add(xmxParam);
            }

            SaveJvmParams();
        }

        private void LoadJvmParams()
        {
            var configManager = ConfigProvider.GetConfigManager();
            var savedParams = configManager.Get<List<string>>("JvmParams");

            if (savedParams != null)
            {
                foreach (var param in savedParams)
                {
                    _jvmParams.Add(param);
                }
            }

            // При загрузке обновляем значение слайдера, если имеется -Xmx
            var xmxParam = _jvmParams.FirstOrDefault(p => p.StartsWith("-Xmx"));
            if (xmxParam != null && int.TryParse(xmxParam.Replace("-Xmx", "").Replace("M", ""), out int xmxValue))
            {
                RamSlider.Value = xmxValue;
            }
        }

        private void SaveJvmParams()
        {
            var configManager = ConfigProvider.GetConfigManager();
            configManager.Set("JvmParams", _jvmParams.ToList());
            configManager.Save();
        }

        // Загрузка выбранной сборки (по умолчанию "Сборка 1")
        private void LoadActiveBuild()
        {
            var configManager = ConfigProvider.GetConfigManager();
            var savedBuild = configManager.Get<string>("ActiveBuild");

            _activeBuild = !string.IsNullOrEmpty(savedBuild) ? savedBuild : "Сборка 1";
            ActiveBuildLabel.Text = $"Активная сборка: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();
        }

        // Сохранение выбранной сборки
        private void SaveActiveBuild()
        {
            var configManager = ConfigProvider.GetConfigManager();
            configManager.Set("ActiveBuild", _activeBuild);
            configManager.Save();
        }

        // Загрузка дополнительных настроек (логирование и режим разработчика)
        private void LoadAdditionalSettings()
        {
            var configManager = ConfigProvider.GetConfigManager();
            _loggingEnabled = configManager.Get<bool>("LoggingEnabled");
            _developerModeEnabled = configManager.Get<bool>("DeveloperModeEnabled");

        }

        // Сохранение дополнительных настроек
        private void SaveAdditionalSettings()
        {
            var configManager = ConfigProvider.GetConfigManager();
            configManager.Set("LoggingEnabled", _loggingEnabled);
            configManager.Set("DeveloperModeEnabled", _developerModeEnabled);
            configManager.Save();
        }

        // Обработчик выбора Сборка 1
        private void BtnBuild1_Clicked(object sender, EventArgs e)
        {
            _activeBuild = "Сборка 1";
            ActiveBuildLabel.Text = $"Активная сборка: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();
            SaveActiveBuild();
        }

        // Обработчик выбора Сборка 2
        private void BtnBuild2_Clicked(object sender, EventArgs e)
        {
            _activeBuild = "Сборка 2";
            ActiveBuildLabel.Text = $"Активная сборка: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();
            SaveActiveBuild();
        }

        // Обновление визуального стиля кнопок сборки
        private void UpdateBuildButtonStyles()
        {
            if (_activeBuild == "Сборка 1")
            {
                Build1Button.BackgroundColor = Color.FromArgb("#4B0082");
                Build2Button.BackgroundColor = Color.FromArgb("#3A0B4D");
            }
            else if (_activeBuild == "Сборка 2")
            {
                Build1Button.BackgroundColor = Color.FromArgb("#3A0B4D");
                Build2Button.BackgroundColor = Color.FromArgb("#4B0082");
            }
        }

        // Обновление описания сборки
        private void UpdateBuildDescription()
        {
            if (_activeBuild == "Сборка 1")
            {
                BuildDescriptionLabel.Text = "Описание сборки: Оптимизирована для стабильной работы.";
            }
            else if (_activeBuild == "Сборка 2")
            {
                BuildDescriptionLabel.Text = "Описание сборки: Режим разработчика с расширенными возможностями.";
            }
        }

        // Добавление нового JVM-параметра
        private void BtnAddJvmParam_Clicked(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(NewJvmParamEntry.Text))
            {
                _jvmParams.Add(NewJvmParamEntry.Text);
                NewJvmParamEntry.Text = string.Empty;
                SaveJvmParams();
            }
        }

        // Удаление выбранного JVM-параметра
        private void BtnRemJvmParam_Clicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var param = button?.BindingContext as string;
            if (param != null)
            {
                _jvmParams.Remove(param);
                SaveJvmParams();
            }
        }

        // Переключение логирования
        private void LoggingSwitch_Toggled(object sender, ToggledEventArgs e)
        {
            _loggingEnabled = e.Value;
            SaveAdditionalSettings();
        }

        // Переключение режима разработчика
        private void DevModeSwitch_Toggled(object sender, ToggledEventArgs e)
        {
            _developerModeEnabled = e.Value;
            SaveAdditionalSettings();
        }

        // Сброс настроек к значениям по умолчанию
        private void ResetSettings_Clicked(object sender, EventArgs e)
        {
            // Сброс JVM параметров и слайдера
            _jvmParams.Clear();
            RamSlider.Value = 2048; // значение по умолчанию

            // Сброс выбранной сборки
            _activeBuild = "Сборка 1";
            ActiveBuildLabel.Text = $"Активная сборка: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();

            // Сброс дополнительных настроек
            _loggingEnabled = false;
            _developerModeEnabled = false;

            // Сохранение дефолтных настроек
            SaveJvmParams();
            SaveActiveBuild();
            SaveAdditionalSettings();
        }
    }
}
