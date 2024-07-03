import { app } from 'electron';

export const LAUNCHER_NAME = 'launcher';
export const SESSION_FOLDER_NAME = 'session';
export const USER_DATA_PATH = `${app.getPath('userData')}/my-launcher`;
export const LOGIN_URL = 'https://my-auth-server.com/login';
export const GAME_DIRECTORY = `${USER_DATA_PATH}/game`;
export const SESSION_FILE_PATH = `${USER_DATA_PATH}/session.json`;
export const ENCRYPTION_KEY = 'ourkey';
export const SALT = 'oursalt';
