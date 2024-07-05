// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};
use tauri::State;

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

fn main() {
  tauri::Builder::default()
    .manage(ProgressState {
      progress: Arc::new(Mutex::new(0)),
    })
    .invoke_handler(tauri::generate_handler![login, update_progress])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
