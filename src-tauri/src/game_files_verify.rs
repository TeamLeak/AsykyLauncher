use std::fs::{self, File};
use std::io::{self, Read};
use std::path::PathBuf;

use reqwest::Client;
use serde_json::Value;
use sha2::{Digest, Sha256};
use crate::storage::{get_mods_path, get_resource_packs_path};

fn get_file_hash(path: &PathBuf) -> io::Result<String> {
    let mut file = File::open(path)?;
    let mut hasher = Sha256::new();
    let mut buffer = vec![0; 4096];

    loop {
        let n = file.read(&mut buffer)?;
        if n == 0 {
            break;
        }
        hasher.update(&buffer[..n]);
    }

    Ok(format!("{:x}", hasher.finalize()))
}

fn get_all_files_in_dir(dir: PathBuf) -> io::Result<Vec<PathBuf>> {
    let mut files = Vec::new();
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            files.push(path);
        }
    }
    Ok(files)
}

async fn verify_files(dir_path: PathBuf, base_url: &str, client: &Client) -> io::Result<Vec<String>> {
    let files = get_all_files_in_dir(dir_path.clone())?;

    let mut local_files = Vec::new();
    let mut removed_or_changed_files = Vec::new();

    for file in &files {
        let hash = get_file_hash(file)?;
        let filename = file.file_name().unwrap().to_string_lossy().to_string();
        local_files.push((filename, hash));
    }

    let response = client
        .post(base_url)
        .json(&local_files)
        .send()
        .await
        .unwrap();

    let server_data: Value = response.json().await.unwrap();

    for (filename, local_hash) in local_files {
        if let Some(server_hash) = server_data.get(&filename) {
            if local_hash != server_hash.as_str().unwrap() {
                println!("Файл {} не прошел проверку, удаляем...", filename);
                fs::remove_file(dir_path.join(&filename))?;
                removed_or_changed_files.push(filename);
            }
        } else {
            println!("Файл {} отсутствует на сервере, удаляем...", filename);
            fs::remove_file(dir_path.join(&filename))?;
            removed_or_changed_files.push(filename);
        }
    }

    Ok(removed_or_changed_files)
}

pub async fn verify_mods_folder() -> io::Result<Vec<String>> {
    let client = Client::new();
    let base_url = "https://example.com/verify/mods";
    let result = verify_files(get_mods_path(), base_url, &client).await?;
    Ok(result)
}

pub async fn verify_resource_packs_folder() -> io::Result<Vec<String>> {
    let client = Client::new();
    let base_url = "https://example.com/verify/resource_packs";
    let result = verify_files(get_resource_packs_path(), base_url, &client).await?;
    Ok(result)
}
