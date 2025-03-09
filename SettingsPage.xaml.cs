using System.Collections.ObjectModel;
using MauiApp3.Services.Providers;

namespace MauiApp3;

public partial class SettingsPage : ContentPage
{
    private ObservableCollection<string> _jvmParams;
    public SettingsPage()
    {
        InitializeComponent();

        _jvmParams = new ObservableCollection<string>();

        LoadJvmParams();

        JvmParamsListView.ItemsSource = _jvmParams;
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