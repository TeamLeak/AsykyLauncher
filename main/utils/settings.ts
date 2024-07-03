import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import {LAUNCHER_NAME} from "../constants";

const settingsFilePath = path.join(app.getPath('userData'), `.${LAUNCHER_NAME}`, 'settings', 'settings.json');

export const loadSettings = (): any => {
  if (fs.existsSync(settingsFilePath)) {
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    return JSON.parse(data);
  }
  return {
    maxRAM: 4,
    minRAM: 2,
    javaExecutable: '',
  };
};

export const saveSettings = (settings: any): void => {
  const folderPath = path.dirname(settingsFilePath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), 'utf8');
};
