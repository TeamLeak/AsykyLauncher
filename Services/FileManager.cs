using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace MauiApp3.Services
{
    public static class FileManager
    {
        // Базовый путь зависит от платформы:
        // Windows – ApplicationData, Unix – UserProfile с точкой для скрытой папки.
        public static readonly string BasePath;
        public static readonly string ConfigPath;
        public static readonly string SessionsPath;
        public static readonly string GamePath;

        static FileManager()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                BasePath = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                    "AsykyLauncher"
                );
            }
            else
            {
                BasePath = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                    ".AsykyLauncher"
                );
            }

            ConfigPath = Path.Combine(BasePath, "config");
            SessionsPath = Path.Combine(BasePath, "sessions");
            GamePath = Path.Combine(BasePath, "game");

            // Создаем необходимые директории с обработкой ошибок
            CreateDirectoryIfNotExists(BasePath);
            CreateDirectoryIfNotExists(ConfigPath);
            CreateDirectoryIfNotExists(SessionsPath);
            CreateDirectoryIfNotExists(GamePath);
        }

        /// <summary>
        /// Создает директорию, если она еще не существует.
        /// При ошибке выбрасывает исключение с подробным описанием.
        /// </summary>
        private static void CreateDirectoryIfNotExists(string path)
        {
            if (!Directory.Exists(path))
            {
                try
                {
                    Directory.CreateDirectory(path);
                }
                catch (Exception ex)
                {
                    throw new Exception($"Не удалось создать директорию по пути: {path}", ex);
                }
            }
        }

        /// <summary>
        /// Асинхронно создает директорию, если она отсутствует.
        /// </summary>
        public static async Task CreateDirectoryIfNotExistsAsync(string path)
        {
            if (!Directory.Exists(path))
            {
                await Task.Run(() => CreateDirectoryIfNotExists(path));
            }
        }

        /// <summary>
        /// Возвращает полный путь, объединяя базовый путь с указанным относительным.
        /// </summary>
        public static string GetFullPath(string relativePath)
        {
            return Path.Combine(BasePath, relativePath);
        }

        /// <summary>
        /// Проверяет, существует ли файл по заданному относительному пути.
        /// </summary>
        public static bool FileExists(string relativePath)
        {
            string fullPath = GetFullPath(relativePath);
            return File.Exists(fullPath);
        }

        /// <summary>
        /// Асинхронно записывает текст в файл, путь которого указывается относительно базовой директории.
        /// </summary>
        public static async Task WriteTextToFileAsync(string relativePath, string content)
        {
            string fullPath = GetFullPath(relativePath);
            try
            {
                await File.WriteAllTextAsync(fullPath, content).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                throw new Exception($"Ошибка записи в файл: {fullPath}", ex);
            }
        }

        /// <summary>
        /// Асинхронно читает текст из файла по относительному пути.
        /// Если файл не существует, выбрасывает исключение.
        /// </summary>
        public static async Task<string> ReadTextFromFileAsync(string relativePath)
        {
            string fullPath = GetFullPath(relativePath);
            if (!File.Exists(fullPath))
            {
                throw new FileNotFoundException($"Файл не найден: {fullPath}");
            }

            try
            {
                return await File.ReadAllTextAsync(fullPath).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                throw new Exception($"Ошибка чтения файла: {fullPath}", ex);
            }
        }
    }
}
