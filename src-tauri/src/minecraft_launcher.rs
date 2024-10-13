use std::path;
use std::sync::{Arc, Mutex};

use open_launcher::{Launcher, version};
use open_launcher::events::Progress;
use tauri::State;
use tokio::sync::broadcast::Receiver;
use crate::game_files_verify::{verify_mods_folder, verify_resource_packs_folder};
use crate::storage::{get_game_path, get_java_path};

pub struct ProgressState {
    pub progress: Arc<Mutex<u8>>,
}

impl ProgressState {
    pub fn new() -> Self {
        Self {
            progress: Arc::new(Mutex::new(0)),
        }
    }
}

pub struct LauncherState {
    pub launcher: Arc<Mutex<Option<Launcher>>>,
}

impl LauncherState {
    pub fn new() -> Self {
        Self {
            launcher: Arc::new(Mutex::new(None)),
        }
    }
}

pub async fn create_launcher(
    minecraft_version: String,
    loader: Option<String>,
    loader_version: Option<String>,
) -> Launcher {
    Launcher::new(
        path::Path::new(get_game_path().as_path())
            .to_str()
            .unwrap(),
        path::Path::new(get_java_path().as_path())
            .join("java.exe")
            .to_str()
            .unwrap(),
        version::Version {
            minecraft_version,
            loader,
            loader_version,
        },
    ).await
}

pub async fn download_minecraft(launcher: &mut Launcher) {
    if let Err(e) = launcher.install_version().await {
        println!("Error installing version: {}", e);
    }

    if let Err(e) = launcher.install_assets().await {
        println!("Error installing assets: {}", e);
    }

    if let Err(e) = launcher.install_libraries().await {
        println!("Error installing libraries: {}", e);
    }
}

pub async fn launch_minecraft(launcher: &mut Launcher) {
    // получше можно сделать.
    verify_mods_folder().await.unwrap();
    verify_resource_packs_folder().await.unwrap();

    match launcher.launch() {
        Ok(mut process) => {
            let _ = process.wait();
            println!("Game closed.");
        }
        Err(e) => {
            println!("Error launching the game: {}", e);
            std::process::exit(1);
        }
    }
}

#[tauri::command]
fn update_progress(state: State<ProgressState>) -> u8 {
    let progress = state.progress.lock().unwrap();
    *progress
}

pub async fn track_launcher_progress(mut receiver: Receiver<Progress>, state: Arc<Mutex<u8>>) {
    while let Ok(progress) = receiver.recv().await {
        let mut current_progress = state.lock().unwrap();
        *current_progress = match progress.total {
            0 => 0,
            _ => (progress.current as f64 / progress.total as f64 * 100.0).round() as u8,
        };
        println!(
            "Progress: {} {}/{} ({}%)",
            progress.task,
            progress.current,
            progress.total,
            *current_progress
        );
    }
    println!("Progress channel closed");
}

#[tauri::command]
async fn create_launcher_tauri(version: String, loader: String, loader_version: String, state: State<'_, LauncherState>) -> Result<(), String> {
    let launcher = create_launcher(version, Some(loader), Some(loader_version)).await;

    let mut stored_launcher = state.launcher.lock().map_err(|e| e.to_string())?;
    *stored_launcher = Some(launcher); // Сохраняем объект лаунчера

    Ok(())
}

#[tauri::command]
async fn download_files(state: State<'_, LauncherState>) -> Result<(), String> {
    let stored_launcher = state.launcher.lock().map_err(|e| e.to_string())?;
    if let Some(ref mut launcher) = *stored_launcher {
        download_minecraft(launcher).await;
        Ok(())
    } else {
        Err("Launcher not created yet.".to_string())
    }
}

#[tauri::command]
async fn launch_game(state: State<'_, LauncherState>) -> Result<(), String> {
    let stored_launcher = state.launcher.lock().map_err(|e| e.to_string())?;
    if let Some(ref mut launcher) = *stored_launcher {
        launch_minecraft(launcher).await;
        Ok(())
    } else {
        Err("Launcher not created yet.".to_string())
    }
}
