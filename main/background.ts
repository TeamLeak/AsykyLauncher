import path from 'path';
import { app, ipcMain, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { createUserFolder } from './createUserFolder';
import { getAllSessions, loadSession } from './sessionManager';
import { launchGame } from './launchGame';
import fs from 'fs';
import {LAUNCHER_NAME} from "./constants";

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow: BrowserWindow | null;

const createMainWindow = () => {
    mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });

    if (isProd) {
        mainWindow.loadURL('app://./index.html');
    } else {
        const port = process.argv[2];
        mainWindow.loadURL(`http://localhost:${port}/`);
        mainWindow.webContents.openDevTools();
    }
};

app.on('ready', async () => {
    const { launcherFolderPath, sessionFolderPath } = createUserFolder();
    console.log(`Launcher folder created at: ${launcherFolderPath}`);
    console.log(`Session folder created at: ${sessionFolderPath}`);

    const settingsFolderPath = path.join(launcherFolderPath, 'settings');
    if (!fs.existsSync(settingsFolderPath)) {
        fs.mkdirSync(settingsFolderPath, { recursive: true });
    }

    const sessions = getAllSessions();

    if (sessions.length > 0) {
        const selectionWindow = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: true,
            },
        });

        selectionWindow.loadURL(`file://${path.join(__dirname, 'renderer', 'sessionSelector.html')}`);

        ipcMain.on('session-selected', (event, sessionId) => {
            const sessionData = loadSession(sessionId);
            if (sessionData) {
                console.log(`Session selected: ${sessionData.username}`);
                createMainWindow();
                selectionWindow.close();
                launchGame();
            }
        });

        ipcMain.on('new-session', () => {
            console.log('Creating new session');
            createMainWindow();
            selectionWindow.close();
            launchGame();
        });
    } else {
        createMainWindow();
        launchGame();
    }
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.handle('load-settings', async () => {
    const settingsPath = path.join(app.getPath('userData'), `.${LAUNCHER_NAME}`, 'settings', 'settings.json');
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
    try {
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.log('Error saving settings:', error);
        return false;
    }
});
