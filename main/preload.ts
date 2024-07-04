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

// Объявление типов параметров в exposeInMainWorld
contextBridge.exposeInMainWorld('electronAPI', {
    loadSettings: () => ipcRenderer.invoke('load-settings'),
    saveSettings: (settings: any) => ipcRenderer.invoke('save-settings', settings),
    getStoreValue: (key: string) => ipcRenderer.invoke('get-store-value', key),
    setStoreValue: (key: string, value: any) => ipcRenderer.invoke('set-store-value', key, value),
});

export type IpcHandler = typeof handler;
