using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace MauiApp3.Services
{
    public class SessionManager(string filePath, string key)
    {
        private readonly string _filePath = filePath;
        private readonly string _key = key;

        public void CreateSession(string jwt)
        {
            File.WriteAllText(_filePath, Encrypt(jwt));
        }

        public string? GetSession()
        {
            if (!File.Exists(_filePath)) return null;
            return Decrypt(File.ReadAllText(_filePath));
        }

        public void InvalidateSession()
        {
            if (File.Exists(_filePath)) File.Delete(_filePath);
        }

        private string Encrypt(string plainText)
        {
            using Aes aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(_key);
            aes.IV = new byte[16];

            using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
            byte[] inputBytes = Encoding.UTF8.GetBytes(plainText);
            byte[] encryptedBytes = encryptor.TransformFinalBlock(inputBytes, 0, inputBytes.Length);
            return Convert.ToBase64String(encryptedBytes);
        }

        private string Decrypt(string encryptedText)
        {
            using Aes aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(_key);
            aes.IV = new byte[16];

            using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            byte[] encryptedBytes = Convert.FromBase64String(encryptedText);
            byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
            return Encoding.UTF8.GetString(decryptedBytes);
        }
    }
}
