using MauiApp3.Services.ConfigStrategies;

namespace MauiApp3.Services.Providers
{
    public class ConfigProvider
    {
        private static readonly ConfigManager _configManager = new(
            FileManager.ConfigPath + "/settings.json",
            new JsonConfigStrategy());

        public static ConfigManager GetConfigManager() => _configManager;
    }
}
