import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { LAUNCHER_NAME, SESSION_FOLDER_NAME } from './constants';

export const createUserFolder = () => {
  const launcherFolder = `.${LAUNCHER_NAME}`;
  const userDataPath = app.getPath('userData');
  const launcherFolderPath = path.join(userDataPath, launcherFolder);
  const sessionFolderPath = path.join(launcherFolderPath, SESSION_FOLDER_NAME);

  if (!fs.existsSync(launcherFolderPath)) {
    fs.mkdirSync(launcherFolderPath, { recursive: true });
  }

  if (!fs.existsSync(sessionFolderPath)) {
    fs.mkdirSync(sessionFolderPath, { recursive: true });
  }

  return { launcherFolderPath, sessionFolderPath };
};
