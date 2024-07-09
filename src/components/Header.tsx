import React from 'react';
import {
  Flex, Heading, HStack, Button, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Spacer, Text, Icon, useColorModeValue
} from '@chakra-ui/react';
import { ChevronDownIcon, SettingsIcon, ViewIcon } from '@chakra-ui/icons';
import { BiLogOut } from 'react-icons/bi';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import Skeleton from '../utils/Skeleton';

const Header: React.FC = () => {
  const { user, isLoading, setUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('black', 'white');
  const hoverBg = useColorModeValue('gray.200', 'gray.700');
  const activeBg = useColorModeValue('gray.300', 'gray.600');
  const menuBg = useColorModeValue('white', 'gray.700');
  const menuBorderColor = useColorModeValue('gray.200', 'gray.600');
  const menuItemColor = useColorModeValue('black', 'white');

  const handleLogout = () => {
    localStorage.removeItem('session');
    setUser({ name: '', avatar: '' });
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/accounts');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <Flex as="header" align="center" padding="4" boxShadow="md" width="100%" bg={bg} color={color}>
      <Heading size="md">Asyky Launcher</Heading>

      <Spacer />

      <HStack spacing="8">
        <Button
          variant="ghost"
          as={Link}
          to="/"
          borderBottom={isActive("/") ? `2px solid ${color}` : "none"}
          _hover={{ bg: hoverBg }}
          _active={{ bg: activeBg }}
        >
          {t('home')}
        </Button>
        <Button
          variant="ghost"
          as={Link}
          to="/servers"
          borderBottom={isActive("/servers") ? `2px solid ${color}` : "none"}
          _hover={{ bg: hoverBg }}
          _active={{ bg: activeBg }}
        >
          {t('servers')}
        </Button>
        <Button
          variant="ghost"
          as={Link}
          to="/store"
          borderBottom={isActive("/store") ? `2px solid ${color}` : "none"}
          _hover={{ bg: hoverBg }}
          _active={{ bg: activeBg }}
        >
          {t('store')}
        </Button>
      </HStack>

      <Spacer />

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg={hoverBg} _hover={{ bg: hoverBg }} _active={{ bg: activeBg }}>
          <HStack spacing="3">
            {isLoading ? (
              <Skeleton />
            ) : user.name ? (
              <>
                <Avatar size="sm" name={user.name} src={user.avatar} />
                <Text>{user.name}</Text>
              </>
            ) : (
              <Text>{t('notLoggedIn')}</Text>
            )}
          </HStack>
        </MenuButton>
        <MenuList bg={menuBg} borderColor={menuBorderColor}>
          {!isLoading && user.name && (
            <>
              <MenuItem icon={<Icon as={ViewIcon} />} color={menuItemColor} onClick={handleProfileClick}>
                {t('openProfile')}
              </MenuItem>
              <MenuItem icon={<Icon as={SettingsIcon} />} color={menuItemColor} onClick={handleSettingsClick}>
                {t('Settings')}
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<Icon as={BiLogOut} />} color="red.500" onClick={handleLogout}>
                {t('logout')}
              </MenuItem>
            </>
          )}
          {!user.name && !isLoading && (
            <MenuItem icon={<Icon as={SettingsIcon} />} color={menuItemColor} onClick={handleSettingsClick}>
              {t('Settings')}
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
