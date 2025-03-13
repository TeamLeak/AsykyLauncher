using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MauiApp3.Services
{
    public class SessionManager
    {
        private readonly string _filePath;
        private readonly byte[] _key;

        public SessionManager(string filePath, string key)
        {
            _filePath = filePath ?? throw new ArgumentNullException(nameof(filePath));
            if (string.IsNullOrEmpty(key))
                throw new ArgumentException("Key must not be null or empty", nameof(key));

            // Вычисляем SHA256-хэш строки ключа, чтобы получить 256-битный ключ для AES-256
            using (SHA256 sha256 = SHA256.Create())
            {
                _key = sha256.ComputeHash(Encoding.UTF8.GetBytes(key));
            }
        }

        /// <summary>
        /// Асинхронно создаёт сессию, шифруя переданный JWT и записывая его в файл.
        /// </summary>
        public async Task CreateSessionAsync(string jwt)
        {
            if (jwt == null) throw new ArgumentNullException(nameof(jwt));

            try
            {
                string encrypted = Encrypt(jwt);
                await File.WriteAllTextAsync(_filePath, encrypted).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                throw new Exception("Ошибка при создании сессии.", ex);
            }
        }

        /// <summary>
        /// Асинхронно получает сессию, дешифруя содержимое файла.
        /// Возвращает null, если файл не существует.
        /// </summary>
        public async Task<string?> GetSessionAsync()
        {
            try
            {
                if (!File.Exists(_filePath))
                    return null;

                string encrypted = await File.ReadAllTextAsync(_filePath).ConfigureAwait(false);
                return Decrypt(encrypted);
            }
            catch (Exception ex)
            {
                throw new Exception("Ошибка при получении сессии.", ex);
            }
        }

        /// <summary>
        /// Асинхронно инвалидирует сессию (удаляет файл с сессией).
        /// </summary>
        public async Task InvalidateSessionAsync()
        {
            try
            {
                if (File.Exists(_filePath))
                {
                    File.Delete(_filePath);
                    await Task.CompletedTask;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Ошибка при инвалидировании сессии.", ex);
            }
        }

        /// <summary>
        /// Шифрует переданный текст с использованием AES в режиме CBC с PKCS7 Padding.
        /// Случайный IV генерируется для каждого шифрования и записывается в начало зашифрованных данных.
        /// </summary>
        private string Encrypt(string plainText)
        {
            using Aes aes = Aes.Create();
            aes.Key = _key;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            aes.GenerateIV();

            using var ms = new MemoryStream();
            // Сначала записываем IV в поток
            ms.Write(aes.IV, 0, aes.IV.Length);

            using (var cs = new CryptoStream(ms, aes.CreateEncryptor(aes.Key, aes.IV), CryptoStreamMode.Write))
            using (var sw = new StreamWriter(cs, Encoding.UTF8))
            {
                sw.Write(plainText);
            }

            return Convert.ToBase64String(ms.ToArray());
        }

        /// <summary>
        /// Дешифрует зашифрованный текст, извлекая IV из начала данных.
        /// </summary>
        private string Decrypt(string encryptedText)
        {
            byte[] combinedBytes = Convert.FromBase64String(encryptedText);

            using Aes aes = Aes.Create();
            aes.Key = _key;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            // Извлекаем IV (первые 16 байт)
            byte[] iv = new byte[aes.BlockSize / 8];
            Buffer.BlockCopy(combinedBytes, 0, iv, 0, iv.Length);
            aes.IV = iv;

            using var ms = new MemoryStream();
            // Записываем зашифрованные данные (без IV) в поток
            ms.Write(combinedBytes, iv.Length, combinedBytes.Length - iv.Length);
            ms.Position = 0;

            using var cs = new CryptoStream(ms, aes.CreateDecryptor(aes.Key, aes.IV), CryptoStreamMode.Read);
            using var sr = new StreamReader(cs, Encoding.UTF8);
            return sr.ReadToEnd();
        }
    }
}
