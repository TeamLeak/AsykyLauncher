namespace MauiApp3.Services.Providers
{
    public static class SessionProvider
    {
        private static readonly SessionManager _sessionManager = new(
            FileManager.SessionsPath + "/session.dat",
            "your-secret-key-123"
        );

        public static SessionManager GetSessionManager() => _sessionManager;
    }
}
