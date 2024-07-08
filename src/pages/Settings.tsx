import React, { useState, useEffect } from 'react';
import {
  Box, Button, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Text, useToast
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import GeneralSettings from '../components/GeneralSettings';
import SystemSettings from '../components/SystemSettings';
import GameSettings from '../components/GameSettings';
import OtherSettings from '../components/OtherSettings';
import { useTranslation } from 'react-i18next';

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [, setTheme] = useState('light');
  const [, setNotifications] = useState(true);
  const [, setVolume] = useState(75);
  const [tempSettings, setTempSettings] = useState({
    theme: 'light',
    notifications: true,
    volume: 75,
    ram: 8,
    cache: 512,
    jvmArgs: ''
  });
  const [, setIsModified] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadSettings = async () => {
      const defaultSettings = await invoke<{
        theme: string;
        notifications: boolean;
        volume: number;
        ram: number;
        cache: number;
        jvmArgs: string
      }>('get_all_settings');
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
      title: t('settings.savedTitle'),
      description: t('settings.savedDescription'),
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Сохранить текущий язык в локальное хранилище
    localStorage.setItem('i18nextLng', i18n.language);
  };

  const handleReset = async () => {
    await invoke('reset_settings');
    const defaultSettings = await invoke<{
      theme: string;
      notifications: boolean;
      volume: number;
      ram: number;
      cache: number;
      jvmArgs: string
    }>('get_all_settings');
    setTheme(defaultSettings.theme);
    setNotifications(defaultSettings.notifications);
    setVolume(defaultSettings.volume);
    setTempSettings(defaultSettings);
    setIsModified(false);
    toast({
      title: t('settings.resetTitle'),
      description: t('settings.resetDescription'),
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
        <Text fontSize="3xl" fontWeight="bold">{t('settings.title')}</Text>
        <Text fontSize="lg">{t('settings.description')}</Text>
      </Box>
      <Tabs>
        <TabList>
          <Tab>{t('settings.general')}</Tab>
          <Tab>{t('settings.system')}</Tab>
          <Tab>{t('settings.game')}</Tab>
          <Tab>{t('settings.other')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box mb={4}>
              <Text>{t('settings.generalDescription')}</Text>
            </Box>
            <GeneralSettings tempSettings={tempSettings} handleInputChange={handleInputChange} />
          </TabPanel>
          <TabPanel>
            <Box mb={4}>
              <Text>{t('settings.systemDescription')}</Text>
            </Box>
            <SystemSettings />
          </TabPanel>
          <TabPanel>
            <Box mb={4}>
              <Text>{t('settings.gameDescription')}</Text>
            </Box>
            <GameSettings tempSettings={tempSettings} handleInputChange={handleInputChange} />
          </TabPanel>
          <TabPanel>
            <Box mb={4}>
              <Text>{t('settings.otherDescription')}</Text>
            </Box>
            <OtherSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex mt="4" gap="4" align="center" justify="center">
        <Button colorScheme="blue" size="lg" onClick={() => window.location.href = '/'}>{t('settings.home')}</Button>
        <Button colorScheme="red" size="lg" onClick={handleReset}>{t('settings.reset')}</Button>
        <Button colorScheme="green" size="lg" onClick={handleSave}>{t('settings.save')}</Button>
      </Flex>
    </Box>
  );
};

export default SettingsPage;
