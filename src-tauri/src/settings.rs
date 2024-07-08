use std::collections::HashMap;
use std::fs;
use serde::{Deserialize, Serialize};
use crate::storage::{ensure_app_dirs, get_settings_path};

const DEFAULT_SETTINGS: &str = r#"{
  "theme": "light",
  "notifications": true,
  "volume": 75
}"#;

#[derive(Serialize, Deserialize, Debug)]
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

#[tauri::command]
pub fn save_setting(key: String, value: serde_json::Value) -> Result<(), String> {
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
pub fn get_setting(key: String) -> Result<serde_json::Value, String> {
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
pub fn get_all_settings() -> Result<HashMap<String, serde_json::Value>, String> {
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
pub fn reset_settings() -> Result<(), String> {
    ensure_app_dirs();
    let path = get_settings_path();
    let default_settings: HashMap<String, serde_json::Value> = serde_json::from_str(DEFAULT_SETTINGS).map_err(|e| e.to_string())?;
    let data = serde_json::to_string(&default_settings).map_err(|e| e.to_string())?;
    fs::write(&path, data).map_err(|e| e.to_string())?;
    Ok(())
}
