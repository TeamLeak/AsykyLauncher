using System;
using System.IO;

namespace MauiApp3.Services
{
    public static class FileManager
    {
        public static readonly string BasePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".AsykyLauncher");
        public static readonly string ConfigPath = Path.Combine(BasePath, "config");
        public static readonly string SessionsPath = Path.Combine(BasePath, "sessions");
        public static readonly string GamePath = Path.Combine(BasePath, "game");

        static FileManager()
        {
            Directory.CreateDirectory(ConfigPath);
            Directory.CreateDirectory(SessionsPath);
            Directory.CreateDirectory(GamePath);
        }
    }
}
