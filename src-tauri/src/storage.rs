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
pub fn get_mods_path() -> PathBuf {
    get_app_dir().join("game").join("mods")
}
pub fn get_resource_packs_path() -> PathBuf {
    get_app_dir().join("game").join("resourcepacks")
}
pub fn get_game_path() -> PathBuf { get_app_dir().join("game") }
pub fn get_java_path() -> PathBuf { get_app_dir().join("java") }
pub fn ensure_app_dirs() {
    let app_dir = get_app_dir();

    let directories = vec![
        app_dir.join("settings"),
        app_dir.join("sessions"),
        app_dir.join("game"),
        app_dir.join("java"),
        app_dir.join("game").join("mods"),           // Отдельная история
        app_dir.join("game").join("resourcepacks"),  // Отдельная история
    ];

    for dir in directories {
        if !dir.exists() {
            fs::create_dir_all(&dir).unwrap();
        }
    }
}
