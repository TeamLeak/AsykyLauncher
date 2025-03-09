using System.Text.Json;
using MauiApp3.Services.ConfigStrategies;

namespace MauiApp3.Services
{
    public class ConfigManager
    {
        private readonly string _filePath;
        private readonly IConfigStrategy _strategy;
        private Dictionary<string, object> _config;
        public ConfigManager(string filePath, IConfigStrategy strategy)
        {
            _filePath = filePath;
            _strategy = strategy;
            _config = _strategy.LoadConfig(_filePath);
        }
        public void Set<T>(string key, T value) => _config[key] = value!;
        public T? Get<T>(string key)
        {
            if (_config.ContainsKey(key))
            {
                if (_config[key] is T value)
                {
                    return value;
                }
                try
                {
                    var json = JsonSerializer.Serialize(_config[key]);
                    return JsonSerializer.Deserialize<T>(json);
                }
                catch
                {
                    return default;
                }
            }

            return default;
        }
        public void Remove(string key) => _config.Remove(key);
        public void Save() => _strategy.SaveConfig(_filePath, _config);
    }
}
