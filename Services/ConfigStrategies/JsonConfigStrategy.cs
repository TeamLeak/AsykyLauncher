using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace MauiApp3.Services.ConfigStrategies
{
    public class JsonConfigStrategy : IConfigStrategy
    {
        private static readonly JsonSerializerOptions _jsonOptions = new() { WriteIndented = true };

        public void SaveConfig(string path, Dictionary<string, object> config)
        {
            File.WriteAllText(path, JsonSerializer.Serialize(config, _jsonOptions));
        }

        public Dictionary<string, object> LoadConfig(string path)
        {
            return File.Exists(path)
                ? JsonSerializer.Deserialize<Dictionary<string, object>>(File.ReadAllText(path), _jsonOptions) ?? []
                : [];
        }
    }
}