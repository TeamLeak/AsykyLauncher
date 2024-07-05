import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const handler = {
    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value);
    },
    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
            callback(...args);
        ipcRenderer.on(channel, subscription);

        return () => {
            ipcRenderer.removeListener(channel, subscription);
        };
    },
};

contextBridge.exposeInMainWorld('electronAPI', {
    loadSettings: () => ipcRenderer.invoke('load-settings'),
    saveSettings: (settings: any) => ipcRenderer.invoke('save-settings', settings),
    getStoreValue: (key: string) => ipcRenderer.invoke('get-store-value', key),
    setStoreValue: (key: string, value: any) => ipcRenderer.invoke('set-store-value', key, value),
    loadProfile: (username: string) => ipcRenderer.invoke('load-profile', username),
    saveProfile: (profile: any) => ipcRenderer.invoke('save-profile', profile),
    registerUser: (profile: any) => ipcRenderer.invoke('register-user', profile),
    loginUser: (data: any) => ipcRenderer.invoke('login-user', data),
    getAllSessions: () => ipcRenderer.invoke('get-all-sessions')
});

export type IpcHandler = typeof handler;
