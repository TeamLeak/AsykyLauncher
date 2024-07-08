use chacha20::ChaCha20;
use chacha20::cipher::{KeyIvInit, StreamCipher};
use rand::Rng;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use tauri::State;
use log::info;
use crate::storage::{ensure_app_dirs, get_app_dir};

const KEY: &[u8; 32] = b"an example very very secret key.";

#[derive(Serialize, Deserialize, Clone, Debug)]
pub(crate) struct Session {
    id: String,
    created_at: String,
    last_online: String,
    user: User,
    one_time: bool,
    api_hash: String,
    jwt_token: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub(crate) struct User {
    name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub(crate) struct Claims {
    username: String,
    exp: i64,
}

pub struct SessionState {
    pub(crate) session: Arc<Mutex<Option<Session>>>,
}

fn get_session_path() -> PathBuf {
    get_app_dir().join("sessions").join("session.enc")
}

fn encrypt(data: &[u8], key: &[u8]) -> Vec<u8> {
    let mut rng = rand::thread_rng();
    let mut nonce = [0u8; 12];
    rng.fill(&mut nonce);
    let mut cipher = ChaCha20::new(key.into(), &nonce.into());
    let mut encrypted_data = data.to_vec();
    cipher.apply_keystream(&mut encrypted_data);
    [nonce.to_vec(), encrypted_data].concat()
}

fn decrypt(data: &[u8], key: &[u8]) -> Vec<u8> {
    let (nonce, data) = data.split_at(12);
    let mut cipher = ChaCha20::new(key.into(), nonce.into());
    let mut decrypted_data = data.to_vec();
    cipher.apply_keystream(&mut decrypted_data);
    decrypted_data
}

#[tauri::command]
pub async fn authenticate_user(username: String, password: String, state: State<'_, SessionState>) -> Result<String, String> {
    info!("Received login request for username: {}", username);

    let client = Client::new();
    let response = client.post("http://localhost:8080/api/auth")
        .json(&serde_json::json!({ "username": username, "password": password }))
        .send()
        .await
        .map_err(|e| {
            info!("Error sending request: {}", e);
            e.to_string()
        })?;

    info!("Response status: {}", response.status());

    if response.status().is_success() {
        let session: Session = response.json().await.map_err(|e| {
            info!("Error parsing response: {}", e);
            e.to_string()
        })?;
        info!("Session created: {:?}", session);
        let encrypted_session = encrypt(&serde_json::to_vec(&session).unwrap(), KEY);

        ensure_app_dirs();
        let path = get_session_path();
        fs::write(path, encrypted_session).map_err(|e| {
            info!("Error writing session to file: {}", e);
            e.to_string()
        })?;

        let mut session_guard = state.session.lock().unwrap();
        *session_guard = Some(session);

        Ok("Login successful".to_string())
    } else {
        let error_message = format!("Failed to authenticate user: {}", response.status());
        info!("{}", error_message);
        Err(error_message)
    }
}

#[tauri::command]
pub async fn validate_session(session_id: String, state: State<'_, SessionState>) -> Result<bool, String> {
    let client = Client::new();
    let response = client.get(&format!("http://localhost:8080/api/session/{}", session_id))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if response.status().is_success() {
        let session: Session = response.json().await.map_err(|e| e.to_string())?;
        let mut session_guard = state.session.lock().unwrap();
        *session_guard = Some(session);
        Ok(true)
    } else {
        Ok(false)
    }
}

#[tauri::command]
pub async fn validate_jwt(jwt: String, session_id: String) -> Result<Claims, String> {
    let client = Client::new();
    let response = client.post("http://localhost:8080/api/validate-jwt")
        .header("Authorization", format!("Bearer {}", jwt))
        .header("Session-ID", session_id)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if response.status().is_success() {
        let claims: Claims = response.json().await.map_err(|e| e.to_string())?;
        Ok(claims)
    } else {
        Err("Failed to validate JWT".to_string())
    }
}

#[tauri::command]
pub async fn regenerate_api_hash(session_id: String, state: State<'_, SessionState>) -> Result<(), String> {
    let client = Client::new();
    let response = client.post(&format!("http://localhost:8080/api/regenerate-api-hash/{}", session_id))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if response.status().is_success() {
        let session: Session = response.json().await.map_err(|e| e.to_string())?;
        let encrypted_session = encrypt(&serde_json::to_vec(&session).unwrap(), KEY);

        ensure_app_dirs();
        let path = get_session_path();
        fs::write(path, encrypted_session).map_err(|e| e.to_string())?;

        let mut session_guard = state.session.lock().unwrap();
        *session_guard = Some(session);

        Ok(())
    } else {
        Err("Failed to regenerate API hash".to_string())
    }
}

#[tauri::command]
pub fn get_session_data(state: State<'_, SessionState>) -> Result<Session, String> {
    let session = state.session.lock().unwrap();
    session.clone().ok_or_else(|| "No active session".to_string())
}

#[tauri::command]
pub fn kill_session(state: State<'_, SessionState>) -> Result<(), String> {
    ensure_app_dirs();
    let path = get_session_path();
    if path.exists() {
        fs::remove_file(path).map_err(|e| e.to_string())?;
    }

    let mut session_guard = state.session.lock().unwrap();
    *session_guard = None;

    Ok(())
}

pub fn load_session(state: State<'_, SessionState>) -> Result<(), String> {
    ensure_app_dirs();
    let path = get_session_path();

    if path.exists() {
        let encrypted_data = fs::read(&path).map_err(|e| e.to_string())?;
        let decrypted_data = decrypt(&encrypted_data, KEY);
        let session: Session = serde_json::from_slice(&decrypted_data).map_err(|e| e.to_string())?;

        let mut session_guard = state.session.lock().unwrap();
        *session_guard = Some(session);

        Ok(())
    } else {
        Ok(())
    }
}
