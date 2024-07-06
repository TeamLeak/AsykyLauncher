import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "welcome": "Welcome to Tauri with Chakra UI!",
        "clickMe": "Click Me",
        "login": "Login",
        "register": "Register",
        "username": "Username",
        "email": "Email",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "loginSuccessful": "Login successful.",
        "registrationSuccessful": "Registration successful.",
        "loginFailed": "Login failed.",
        "registrationFailed": "Registration failed.",
        "loginSuccessMessage": "You have been successfully logged in.",
        "registrationSuccessMessage": "You have been successfully registered.",
        "loginFailureMessage": "Invalid username or password.",
        "registrationFailureMessage": "An error occurred during registration.",
        "passwordMismatch": "Passwords do not match.",
        "progress": "Progress",
        "loginWithSite": "Login with site",
        "usernameOrEmail": "Username or Email",
        "noAccount": "Don't have an account?",
        "createAccount": "Create one",
        "alreadyHaveAccount": "Already have an account?",
        "or": "OR",
        "pleaseLoginToContinue": "Please log in to continue.",
        "whoIsPlaying": "Who is playing?",
        "addPlayer": "Add player",
        "open": "Open",
        "logout": "Logout",
        "loggingIn": "Logging in..."
      }
    },
    ru: {
      translation: {
        "welcome": "Добро пожаловать в Tauri с Chakra UI!",
        "clickMe": "Нажми меня",
        "login": "Вход",
        "register": "Регистрация",
        "username": "Имя пользователя",
        "email": "Электронная почта",
        "password": "Пароль",
        "confirmPassword": "Подтвердите пароль",
        "loginSuccessful": "Вход выполнен успешно.",
        "registrationSuccessful": "Регистрация выполнена успешно.",
        "loginFailed": "Ошибка входа.",
        "registrationFailed": "Ошибка регистрации.",
        "loginSuccessMessage": "Вы успешно вошли в систему.",
        "registrationSuccessMessage": "Вы успешно зарегистрировались.",
        "loginFailureMessage": "Неправильное имя пользователя или пароль.",
        "registrationFailureMessage": "Произошла ошибка при регистрации.",
        "passwordMismatch": "Пароли не совпадают.",
        "progress": "Прогресс",
        "loginWithSite": "Войти через сайт",
        "usernameOrEmail": "Имя пользователя или почта",
        "noAccount": "Нет аккаунта?",
        "createAccount": "Создать",
        "alreadyHaveAccount": "Уже есть аккаунт?",
        "or": "ИЛИ",
        "pleaseLoginToContinue": "Пожалуйста, войдите в аккаунт, чтобы продолжить.",
        "whoIsPlaying": "Кто играет?",
        "addPlayer": "Добавить игрока",
        "open": "Открыть",
        "logout": "Выйти",
        "loggingIn": "Вхожу в аккаунт..."
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
