#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod settings;
mod storage;
mod sessions;
mod tray;

use std::sync::{Arc, Mutex};
use tauri::{Manager, State};
use settings::{save_setting, get_setting, get_all_settings, reset_settings};
use sessions::{authenticate_user, validate_session, validate_jwt, regenerate_api_hash, get_session_data, kill_session, load_session};
use crate::sessions::SessionState;
use crate::tray::create_tray;

struct ProgressState {
    progress: Arc<Mutex<u8>>,
}

#[tauri::command]
fn login(username: String, password: String) -> String {
    if username == "user" && password == "password" {
        "Login successful".to_string()
    } else {
        "Invalid credentials".to_string()
    }
}

#[tauri::command]
fn update_progress(state: State<ProgressState>) -> u8 {
    let mut progress = state.progress.lock().unwrap();
    if *progress < 100 {
        *progress += 10;
    } else {
        *progress = 0;
    }
    *progress
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .manage(ProgressState {
            progress: Arc::new(Mutex::new(0)),
        })
        .manage(SessionState {
            session: Arc::new(Mutex::new(None)),
        })
        .invoke_handler(tauri::generate_handler![
            login,
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
        .setup(|app| {
            let handle = app.handle();
            tauri::async_runtime::spawn(async move {
                create_tray();
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
