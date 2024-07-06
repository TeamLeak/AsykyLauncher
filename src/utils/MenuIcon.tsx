import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md'; // Импортируем иконку меню
import { useNavigate } from 'react-router-dom';

const MenuIcon: React.FC<{ setIsAuthenticated: (value: boolean) => void }> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleOpen = () => {
        console.log("Открыть");
        navigate('/');
    };

    const handleLogout = () => {
        console.log("Выйти");
        // Удаление сессии пользователя (пример)
        localStorage.removeItem('session');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const handleDisableNotifications = () => {
        console.log("Отключить уведомления");
    };

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<MdMenu />}
                variant="outline"
            />
            <MenuList>
                <MenuItem onClick={handleOpen}>Открыть</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                <MenuItem onClick={handleDisableNotifications}>Отключить уведомления</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MenuIcon;
