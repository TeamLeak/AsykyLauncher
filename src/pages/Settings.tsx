import React, { useState, useEffect } from 'react';
import {
  Box, Button, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Text, useToast
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import GeneralSettings from '../components/GeneralSettings';
import SystemSettings from '../components/SystemSettings';
import GameSettings from '../components/GameSettings';
import OtherSettings from '../components/OtherSettings';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [, setNotifications] = useState(true);
  const [, setVolume] = useState(75);
  const [tempSettings, setTempSettings] = useState({ theme: 'light', notifications: true, volume: 75, ram: 8, cache: 512, jvmArgs: '' });
  const [, setIsModified] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadSettings = async () => {
      const defaultSettings = await invoke<{ theme: string; notifications: boolean; volume: number; ram: number; cache: number; jvmArgs: string }>('get_all_settings');
      setTheme(defaultSettings.theme);
      setNotifications(defaultSettings.notifications);
      setVolume(defaultSettings.volume);
      setTempSettings(defaultSettings);
    };

    loadSettings().then(r => console.log(r));
  }, []);

  const handleSave = async () => {
    await invoke('save_setting', { key: 'theme', value: tempSettings.theme });
    await invoke('save_setting', { key: 'notifications', value: tempSettings.notifications });
    await invoke('save_setting', { key: 'volume', value: tempSettings.volume });
    await invoke('save_setting', { key: 'ram', value: tempSettings.ram });
    await invoke('save_setting', { key: 'cache', value: tempSettings.cache });
    await invoke('save_setting', { key: 'jvmArgs', value: tempSettings.jvmArgs });

    setTheme(tempSettings.theme);
    setNotifications(tempSettings.notifications);
    setVolume(tempSettings.volume);
    setIsModified(false);
    toast({
      title: "Settings saved.",
      description: "Your settings have been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleReset = async () => {
    await invoke('reset_settings');
    const defaultSettings = await invoke<{ theme: string; notifications: boolean; volume: number; ram: number; cache: number; jvmArgs: string }>('get_all_settings');
    setTheme(defaultSettings.theme);
    setNotifications(defaultSettings.notifications);
    setVolume(defaultSettings.volume);
    setTempSettings(defaultSettings);
    setIsModified(false);
    toast({
      title: "Settings reset.",
      description: "Your settings have been reset to defaults.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleInputChange = (key: string, value: any) => {
    setTempSettings(prev => ({ ...prev, [key]: value }));
    setIsModified(true);
  };

  return (
      <Box p="8">
        <Box mb={6}>
          <Text fontSize="3xl" fontWeight="bold">Settings</Text>
          <Text fontSize="lg">Manage the launcher and game behavior from here.</Text>
        </Box>
        <Tabs>
          <TabList>
            <Tab>General Settings</Tab>
            <Tab>System Settings</Tab>
            <Tab>Game Settings</Tab>
            <Tab>Other Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box mb={4}>
                <Text>Adjust your general preferences and system behavior.</Text>
              </Box>
              <GeneralSettings tempSettings={tempSettings} handleInputChange={handleInputChange} />
            </TabPanel>
            <TabPanel>
              <Box mb={4}>
                <Text>Configure system-related settings.</Text>
              </Box>
              <SystemSettings />
            </TabPanel>
            <TabPanel>
              <Box mb={4}>
                <Text>Manage game-specific settings including RAM and cache allocation.</Text>
              </Box>
              <GameSettings tempSettings={tempSettings} handleInputChange={handleInputChange} />
            </TabPanel>
            <TabPanel>
              <Box mb={4}>
                <Text>Explore additional settings and configurations.</Text>
              </Box>
              <OtherSettings />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Flex mt="6" gap="4">
          <Button colorScheme="green" onClick={handleSave}>Save</Button>
          <Button colorScheme="blue" onClick={() => window.location.href = '/'}>Home</Button>
          <Button colorScheme="red" onClick={handleReset}>Reset to Defaults</Button>
        </Flex>
      </Box>
  );
};

export default SettingsPage;
