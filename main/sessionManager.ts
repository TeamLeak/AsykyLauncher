import fs from 'fs';
import path from 'path';
import { encrypt, decrypt } from './cryptoUtils';
import { createUserFolder } from './createUserFolder';
import { SessionData, Profile } from './sessionTypes';

const { sessionFolderPath } = createUserFolder();

export const saveSession = (sessionId: string, sessionData: SessionData) => {
    const encryptedData = encrypt(JSON.stringify(sessionData));
    const filePath = path.join(sessionFolderPath, `${sessionId}.session`);
    fs.writeFileSync(filePath, encryptedData, 'utf-8');
};

export const loadSession = (sessionId: string): SessionData | null => {
    const filePath = path.join(sessionFolderPath, `${sessionId}.session`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const encryptedData = fs.readFileSync(filePath, 'utf-8');
    const decryptedData = decrypt(encryptedData);
    return JSON.parse(decryptedData) as SessionData;
};

export const getAllSessions = (): { id: string, username: string }[] => {
    if (!fs.existsSync(sessionFolderPath)) {
        return [];
    }
    const files = fs.readdirSync(sessionFolderPath);
    return files
        .filter(file => file.endsWith('.session'))
        .map(file => {
            const sessionId = path.basename(file, '.session');
            const sessionData = loadSession(sessionId);
            if (sessionData) {
                return { id: sessionId, username: sessionData.username };
            } else {
                return null;
            }
        })
        .filter(session => session !== null) as { id: string, username: string }[];
};

export const deleteSession = (sessionId: string) => {
    const filePath = path.join(sessionFolderPath, `${sessionId}.session`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

export const saveProfile = (profile: Profile) => {
    const filePath = path.join(sessionFolderPath, `${profile.username}.profile`);
    const encryptedProfile = encrypt(JSON.stringify(profile));
    fs.writeFileSync(filePath, encryptedProfile, 'utf-8');
};

export const loadProfile = (username: string): Profile | null => {
    const filePath = path.join(sessionFolderPath, `${username}.profile`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const encryptedProfile = fs.readFileSync(filePath, 'utf-8');
    const decryptedProfile = decrypt(encryptedProfile);
    return JSON.parse(decryptedProfile) as Profile;
};
