import path from 'path';
import {app, ipcMain, BrowserWindow} from 'electron';
import serve from 'electron-serve';
import {createWindow} from './helpers';
import {createUserFolder} from './createUserFolder';
import {getAllSessions, saveSession, loadSession} from './sessionManager';
import {SessionData} from './sessionTypes';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({directory: 'app'});
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
        },
        autoHideMenuBar: true,
    });

    if (isProd) {
        mainWindow.loadURL('app://./home');
    } else {
        const port = process.argv[2];
        mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }
};

app.on('ready', async () => {
    const {launcherFolderPath, sessionFolderPath} = createUserFolder();
    console.log(`Launcher folder created at: ${launcherFolderPath}`);
    console.log(`Session folder created at: ${sessionFolderPath}`);

    const sessions = getAllSessions();

    if (sessions.length > 0) {
        const selectionWindow = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
        });

        selectionWindow.loadURL(`file://${path.join(__dirname, 'renderer', 'sessionSelector.html')}`);

        ipcMain.on('session-selected', (event, sessionId) => {
            const sessionData = loadSession(sessionId);
            if (sessionData) {
                console.log(`Session selected: ${sessionData.username}`);
                createMainWindow();
                selectionWindow.close();
            }
        });

        ipcMain.on('new-session', () => {
            console.log('Creating new session');
            createMainWindow();
            selectionWindow.close();
        });
    } else {
        createMainWindow();
    }
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});
