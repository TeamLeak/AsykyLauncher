use log::info;
use env_logger;
use std::sync::{Arc, Mutex};
use tauri::{Manager, State};

mod settings;
mod sessions;
mod storage;
mod tray;
mod game_files_verify;
mod minecraft_launcher;

use settings::{save_setting, get_setting, get_all_settings, reset_settings};
use sessions::{authenticate_user, validate_session, validate_jwt, regenerate_api_hash, get_session_data, kill_session, load_session};
use crate::minecraft_launcher::ProgressState;
use crate::minecraft_launcher::LauncherState;
use crate::sessions::SessionState;
use crate::tray::{create_tray, handle_tray_event};

#[tokio::main]
async fn main() {
    env_logger::init();
    info!("Logger initialized");

    tauri::Builder::default()
        .manage(ProgressState {
            progress: Arc::new(Mutex::new(0)),
        })
        .manage(SessionState {
            session: Arc::new(Mutex::new(None)),
        })
        .manage(LauncherState::new())
        .invoke_handler(tauri::generate_handler![
            create_launcher_tauri,
            download_files,
            launch_game,
            update_progress,
            save_setting,
            get_setting,
            get_all_settings,
            reset_settings,
            authenticate_user,
            validate_session,
            validate_jwt,
            regenerate_api_hash,
            get_session_data,
            kill_session,
        ])
        .system_tray(create_tray())
        .on_system_tray_event(handle_tray_event)
        .setup(|app| {
            let handle = app.handle();
            tauri::async_runtime::spawn(async move {
                let state = handle.state::<SessionState>();
                if let Err(err) = load_session(state) {
                    println!("Failed to load session: {}", err);
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}