declare global {
  interface Window {
    electronAPI: {
      loadSettings: () => Promise<any>;
      saveSettings: (settings: any) => Promise<boolean>;
      getStoreValue: (key: string) => Promise<any>;
      setStoreValue: (key: string, value: any) => Promise<void>;
    };
  }
}

export {};
