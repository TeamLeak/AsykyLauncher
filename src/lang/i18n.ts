import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "welcome": "Welcome to Tauri with Chakra UI!",
                "clickMe": "Click Me",
                "login": "Login",
                "username": "Username",
                "password": "Password",
                "loginSuccessful": "Login successful.",
                "loginFailed": "Login failed.",
                "loginSuccessMessage": "You have been successfully logged in.",
                "loginFailureMessage": "Invalid username or password.",
                "progress": "Progress",
                "loginWithSite": "Login with site",
                "usernameOrEmail": "Username or Email",
                "noAccount": "Don't have an account?",
                "createAccount": "Create one",
                "or": "OR"
            }
        },
        ru: {
            translation: {
                "welcome": "Добро пожаловать в Tauri с Chakra UI!",
                "clickMe": "Нажми меня",
                "login": "Вход",
                "username": "Имя пользователя",
                "password": "Пароль",
                "loginSuccessful": "Вход выполнен успешно.",
                "loginFailed": "Ошибка входа.",
                "loginSuccessMessage": "Вы успешно вошли в систему.",
                "loginFailureMessage": "Неправильное имя пользователя или пароль.",
                "progress": "Прогресс",
                "loginWithSite": "Войти через сайт",
                "usernameOrEmail": "Имя пользователя или почта",
                "noAccount": "Нет аккаунта?",
                "createAccount": "Создать",
                "or": "ИЛИ"
            }
        }
    },
    lng: "en", // язык по умолчанию
    fallbackLng: "en",
    interpolation: {
        escapeValue: false // react уже по умолчанию экранирует
    }
});

export default i18n;
