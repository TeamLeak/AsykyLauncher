use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, AppHandle, Manager};
use crate::{SessionState, kill_session};

pub fn create_tray() -> SystemTray {
    let open = CustomMenuItem::new("open".to_string(), "Open");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let logout = CustomMenuItem::new("logout".to_string(), "Logout");

    let tray_menu = SystemTrayMenu::new()
        .add_item(open)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(logout)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    SystemTray::new()
        .with_menu(tray_menu)
}

pub fn handle_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => {
            match id.as_str() {
                "open" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
                "quit" => {
                    std::process::exit(0);
                }
                "logout" => {
                    let state = app.state::<SessionState>();
                    if let Err(err) = kill_session(state) {
                        eprintln!("Failed to kill session: {}", err);
                    }
                    let window = app.get_window("main").unwrap();
                    window.emit("logout", "User logged out").unwrap();
                }
                _ => {}
            }
        }
        _ => {}
    }
}
