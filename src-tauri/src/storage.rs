use std::fs;
use std::path::PathBuf;

const APP_NAME: &str = "ExampleApp";

pub fn get_app_dir() -> PathBuf {
    let base_dir = dirs::config_dir().unwrap();
    base_dir.join(APP_NAME)
}

pub fn get_settings_path() -> PathBuf {
    get_app_dir().join("settings").join("settings.json")
}

pub fn ensure_app_dirs() {
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
