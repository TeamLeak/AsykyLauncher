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

        // ���������� ��������� -Xmx ��� ��������� ��������
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

            // ��� �������� ��������� �������� ��������, ���� ������� -Xmx
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

        // �������� ��������� ������ (�� ��������� "������ 1")
        private void LoadActiveBuild()
        {
            var configManager = ConfigProvider.GetConfigManager();
            var savedBuild = configManager.Get<string>("ActiveBuild");

            _activeBuild = !string.IsNullOrEmpty(savedBuild) ? savedBuild : "������ 1";
            ActiveBuildLabel.Text = $"�������� ������: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();
        }

        // ���������� ��������� ������
        private void SaveActiveBuild()
        {
            var configManager = ConfigProvider.GetConfigManager();
            configManager.Set("ActiveBuild", _activeBuild);
            configManager.Save();
        }

        // �������� �������������� �������� (����������� � ����� ������������)
        private void LoadAdditionalSettings()
        {
            var configManager = ConfigProvider.GetConfigManager();
            _loggingEnabled = configManager.Get<bool>("LoggingEnabled");
            _developerModeEnabled = configManager.Get<bool>("DeveloperModeEnabled");

        }

        // ���������� �������������� ��������
        private void SaveAdditionalSettings()
        {
            var configManager = ConfigProvider.GetConfigManager();
            configManager.Set("LoggingEnabled", _loggingEnabled);
            configManager.Set("DeveloperModeEnabled", _developerModeEnabled);
            configManager.Save();
        }

        // ���������� ������ ������ 1
        private void BtnBuild1_Clicked(object sender, EventArgs e)
        {
            _activeBuild = "������ 1";
            ActiveBuildLabel.Text = $"�������� ������: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();
            SaveActiveBuild();
        }

        // ���������� ������ ������ 2
        private void BtnBuild2_Clicked(object sender, EventArgs e)
        {
            _activeBuild = "������ 2";
            ActiveBuildLabel.Text = $"�������� ������: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();
            SaveActiveBuild();
        }

        // ���������� ����������� ����� ������ ������
        private void UpdateBuildButtonStyles()
        {
            if (_activeBuild == "������ 1")
            {
                Build1Button.BackgroundColor = Color.FromArgb("#4B0082");
                Build2Button.BackgroundColor = Color.FromArgb("#3A0B4D");
            }
            else if (_activeBuild == "������ 2")
            {
                Build1Button.BackgroundColor = Color.FromArgb("#3A0B4D");
                Build2Button.BackgroundColor = Color.FromArgb("#4B0082");
            }
        }

        // ���������� �������� ������
        private void UpdateBuildDescription()
        {
            if (_activeBuild == "������ 1")
            {
                BuildDescriptionLabel.Text = "�������� ������: �������������� ��� ���������� ������.";
            }
            else if (_activeBuild == "������ 2")
            {
                BuildDescriptionLabel.Text = "�������� ������: ����� ������������ � ������������ �������������.";
            }
        }

        // ���������� ������ JVM-���������
        private void BtnAddJvmParam_Clicked(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(NewJvmParamEntry.Text))
            {
                _jvmParams.Add(NewJvmParamEntry.Text);
                NewJvmParamEntry.Text = string.Empty;
                SaveJvmParams();
            }
        }

        // �������� ���������� JVM-���������
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

        // ������������ �����������
        private void LoggingSwitch_Toggled(object sender, ToggledEventArgs e)
        {
            _loggingEnabled = e.Value;
            SaveAdditionalSettings();
        }

        // ������������ ������ ������������
        private void DevModeSwitch_Toggled(object sender, ToggledEventArgs e)
        {
            _developerModeEnabled = e.Value;
            SaveAdditionalSettings();
        }

        // ����� �������� � ��������� �� ���������
        private void ResetSettings_Clicked(object sender, EventArgs e)
        {
            // ����� JVM ���������� � ��������
            _jvmParams.Clear();
            RamSlider.Value = 2048; // �������� �� ���������

            // ����� ��������� ������
            _activeBuild = "������ 1";
            ActiveBuildLabel.Text = $"�������� ������: {_activeBuild}";
            UpdateBuildButtonStyles();
            UpdateBuildDescription();

            // ����� �������������� ��������
            _loggingEnabled = false;
            _developerModeEnabled = false;

            // ���������� ��������� ��������
            SaveJvmParams();
            SaveActiveBuild();
            SaveAdditionalSettings();
        }
    }
}
