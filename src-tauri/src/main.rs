// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use tauri::State;
use serde::{Deserialize, Serialize};

const APP_NAME: &str = "ExampleApp";
const DEFAULT_SETTINGS: &str = r#"{
  "theme": "light",
  "notifications": true,
  "volume": 75
}"#;

#[derive(Serialize, Deserialize)]
struct Settings {
  theme: String,
  notifications: bool,
  volume: u8,
}

impl Default for Settings {
  fn default() -> Self {
    serde_json::from_str(DEFAULT_SETTINGS).unwrap()
  }
}

struct ProgressState {
  progress: Arc<Mutex<u8>>,
}

fn get_app_dir() -> PathBuf {
  let base_dir = dirs::config_dir().unwrap();
  base_dir.join(APP_NAME)
}

fn get_settings_path() -> PathBuf {
  get_app_dir().join("settings").join("settings.json")
}

fn ensure_app_dirs() {
  let app_dir = get_app_dir();
  let settings_dir = app_dir.join("settings");
  let sessions_dir = app_dir.join("sessions");

  if !settings_dir.exists() {
    fs::create_dir_all(&settings_dir).unwrap();
  }

  if !sessions_dir.exists() {
    fs::create_dir_all(&sessions_dir).unwrap();
  }
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

#[tauri::command]
fn save_setting(key: String, value: serde_json::Value) -> Result<(), String> {
  ensure_app_dirs();
  let path = get_settings_path();

  let mut settings: HashMap<String, serde_json::Value> = if path.exists() {
    let data = fs::read_to_string(&path).map_err(|e| e.to_string())?;
    serde_json::from_str(&data).map_err(|e| e.to_string())?
  } else {
    HashMap::new()
  };

  settings.insert(key, value);

  let data = serde_json::to_string(&settings).map_err(|e| e.to_string())?;
  fs::write(&path, data).map_err(|e| e.to_string())?;

  Ok(())
}

#[tauri::command]
fn get_setting(key: String) -> Result<serde_json::Value, String> {
  ensure_app_dirs();
  let path = get_settings_path();

  if path.exists() {
    let data = fs::read_to_string(&path).map_err(|e| e.to_string())?;
    let settings: HashMap<String, serde_json::Value> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    settings.get(&key).cloned().ok_or_else(|| "Setting not found".to_string())
  } else {
    Err("Settings file not found".to_string())
  }
}

#[tauri::command]
fn get_all_settings() -> Result<HashMap<String, serde_json::Value>, String> {
  ensure_app_dirs();
  let path = get_settings_path();

  if path.exists() {
    let data = fs::read_to_string(&path).map_err(|e| e.to_string())?;
    let settings: HashMap<String, serde_json::Value> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(settings)
  } else {
    Ok(HashMap::new())
  }
}

#[tauri::command]
fn reset_settings() -> Result<(), String> {
  ensure_app_dirs();
  let path = get_settings_path();
  let default_settings: HashMap<String, serde_json::Value> = serde_json::from_str(DEFAULT_SETTINGS).map_err(|e| e.to_string())?;
  let data = serde_json::to_string(&default_settings).map_err(|e| e.to_string())?;
  fs::write(&path, data).map_err(|e| e.to_string())?;
  Ok(())
}

fn main() {
  tauri::Builder::default()
    .manage(ProgressState {
      progress: Arc::new(Mutex::new(0)),
    })
    .invoke_handler(tauri::generate_handler![
      login,
      update_progress,
      save_setting,
      get_setting,
      get_all_settings,
      reset_settings
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
