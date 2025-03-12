using System.Collections.ObjectModel;
using MauiApp3.Services.Providers;

namespace MauiApp3
{
    public partial class SettingsPage : ContentPage
    {
        private ObservableCollection<string> _jvmParams;
        public SettingsPage()
        {
            InitializeComponent();

            _jvmParams = new ObservableCollection<string>();

            LoadJvmParams();

            BindingContext = this;

            RamSlider.ValueChanged += RamSlider_ValueChanged;
        }

        public ObservableCollection<string> JvmParams => _jvmParams;

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
        private void BtnAddJvmParam_Clicked(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(NewJvmParamEntry.Text))
            {
                _jvmParams.Add(NewJvmParamEntry.Text);
                NewJvmParamEntry.Text = string.Empty;

                SaveJvmParams();
            }
        }
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
    }
}