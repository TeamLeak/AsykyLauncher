import path from 'path';
import { app, ipcMain, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { createUserFolder } from './createUserFolder';
import { saveProfile, loadProfile, saveSession, loadSession, getAllSessions, deleteSession } from './sessionManager';
import { launchGame } from './launchGame';
import fs from 'fs';
import Store from 'electron-store';
import { LAUNCHER_NAME } from './constants';
import { SessionData } from './sessionTypes';
import crypto from 'crypto';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow: BrowserWindow | null;

const store = new Store();

const createMainWindow = () => {
    console.log('Creating main window');
    mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts'),
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });

    if (isProd) {
        const url = 'app://-';
        console.log(`Loading URL in production mode: ${url}`);
        mainWindow.loadURL(url).then(() => {
            console.log('URL loaded successfully');
        }).catch(err => {
            console.error(`Failed to load URL: ${url}`, err);
        });
    } else {
        const port = process.argv[2] || 3000;
        const url = `http://localhost:${port}`;
        console.log(`Loading URL in development mode: ${url}`);
        mainWindow.loadURL(url).then(() => {
            console.log('URL loaded successfully');
        }).catch(err => {
            console.error(`Failed to load URL: ${url}`, err);
        });
        mainWindow.webContents.openDevTools();
    }
};

app.on('ready', async () => {
    console.log('App is ready');
    createUserFolder();
    const sessions = getAllSessions();
    console.log(`Found sessions: ${sessions.length}`);
    if (sessions.length > 1) {
        console.log('More than one session found, creating profile selector window');
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.ts'),
                contextIsolation: true,
            },
            autoHideMenuBar: true,
        });

        let url: string;
        if (isProd) {
            url = `/profile-selector`;
        } else {
            const port = process.argv[2] || 3000;
            url = `http://localhost:${port}/profile-selector`;
        }

        console.log(`Loading URL: ${url}`);
        mainWindow.loadURL(url).then(() => {
            console.log('URL loaded successfully');
        }).catch(err => {
            console.error(`Failed to load URL: ${url}`, err);
        });
    } else {
        createMainWindow();
    }
});

app.on('window-all-closed', () => {
    console.log('All windows closed, quitting app');
    app.quit();
});

ipcMain.handle('load-settings', async () => {
    const settingsPath = path.join(app.getPath('userData'), `.${LAUNCHER_NAME}`, 'settings', 'settings.json');
    console.log(`Loading settings from: ${settingsPath}`);
    try {
        if (fs.existsSync(settingsPath)) {
            const data = fs.readFileSync(settingsPath, 'utf-8');
            return JSON.parse(data);
        } else {
            return { maxRAM: 4, minRAM: 2, javaExecutable: '' };
        }
    } catch (error) {
        console.log('Error loading settings:', error);
        return { maxRAM: 4, minRAM: 2, javaExecutable: '' };
    }
});

ipcMain.handle('save-settings', async (event, settings) => {
    const settingsPath = path.join(app.getPath('userData'), `.${LAUNCHER_NAME}`, 'settings', 'settings.json');
    console.log(`Saving settings to: ${settingsPath}`);
    try {
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.log('Error saving settings:', error);
        return false;
    }
});

ipcMain.handle('load-profile', async (event, username) => {
    console.log(`Loading profile for username: ${username}`);
    try {
        const profile = loadProfile(username);
        return profile || { username: '', email: '', avatar: '' };
    } catch (error) {
        console.log('Error loading profile:', error);
        return { username: '', email: '', avatar: '' };
    }
});

ipcMain.handle('save-profile', async (event, profile) => {
    console.log(`Saving profile for username: ${profile.username}`);
    try {
        saveProfile(profile);
        return true;
    } catch (error) {
        console.log('Error saving profile:', error);
        return false;
    }
});

ipcMain.handle('register-user', async (event, profile) => {
    console.log(`Registering user with username: ${profile.username}`);
    try {
        saveProfile(profile);
        return { success: true };
    } catch (error) {
        console.log('Error registering user:', error);
        return { success: false, message: 'Registration failed' };
    }
});

ipcMain.handle('login-user', async (event, data) => {
    console.log(`Logging in user with username: ${data.username}`);
    try {
        const profile = loadProfile(data.username);
        if (profile && profile.password === data.password) {
            const token = crypto.randomBytes(16).toString('hex');
            const sessionData: SessionData = { username: profile.username, token };
            saveSession(profile.username, sessionData);
            return { success: true, profile, token };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    } catch (error) {
        console.log('Error logging in user:', error);
        return { success: false, message: 'Login failed' };
    }
});

ipcMain.handle('get-store-value', (event, key) => {
    console.log(`Getting store value for key: ${key}`);
    return store.get(key);
});

ipcMain.handle('set-store-value', (event, key, value) => {
    console.log(`Setting store value for key: ${key}, value: ${value}`);
    store.set(key, value);
});

ipcMain.handle('get-all-sessions', async () => {
    console.log('Getting all sessions');
    try {
        const sessions = getAllSessions();
        return sessions;
    } catch (error) {
        console.log('Error getting all sessions:', error);
        return [];
    }
});
