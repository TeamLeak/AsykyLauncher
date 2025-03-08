using System.Collections.Generic;

namespace MauiApp3.Services.ConfigStrategies
{
    public interface IConfigStrategy
    {
        void SaveConfig(string path, Dictionary<string, object> config);
        Dictionary<string, object> LoadConfig(string path);
    }
}
