import { exec } from 'child_process';
import { GAME_DIRECTORY } from './constants';

export function launchGame() {
  const gameExecutablePath = `${GAME_DIRECTORY}/minecraft.exe`;
  exec(gameExecutablePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка при запуске игры: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Ошибка игры: ${stderr}`);
      return;
    }
    console.log(`Вывод игры: ${stdout}`);
  });
}
