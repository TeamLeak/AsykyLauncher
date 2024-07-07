import React, { useState, useEffect } from 'react';
import {
  Box, Button, Checkbox, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, useToast, Input, Tooltip, Tabs, TabList, TabPanels, Tab, TabPanel, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, useColorModeValue, Select, Switch, Table, Thead, Tbody, Tr, Th, Td,
} from '@chakra-ui/react';
import LanguageSwitcher from '../utils/LanguageSwitcher';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import { invoke } from '@tauri-apps/api/tauri';

const GeneralSettings: React.FC<{
  tempSettings: { theme: string; notifications: boolean; volume: number };
  handleInputChange: (key: string, value: any) => void;
}> = ({ tempSettings, handleInputChange }) => (
  <Accordion allowToggle>
    <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
      <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
        <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
          Theme
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <ThemeSwitcher
          onToggleStart={() => handleInputChange('theme', tempSettings.theme === 'light' ? 'dark' : 'light')}
          onToggleEnd={() => { }}
        />
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
      <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
        <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
          Notifications
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <Checkbox isChecked={tempSettings.notifications} onChange={(e) => handleInputChange('notifications', e.target.checked)}>
          Enable Notifications
        </Checkbox>
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
      <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
        <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
          Volume
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <Slider value={tempSettings.volume} onChange={(val) => handleInputChange('volume', val)} max={100}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md">
      <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
        <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
          Language
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <Box>
          <LanguageSwitcher />
        </Box>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

const SystemSettings: React.FC = () => (
  <Accordion allowToggle>
    <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
      <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
        <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
          System Preferences
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <Text>Configure system-related settings here.</Text>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

const GameSettings: React.FC<{ tempSettings: any; handleInputChange: (key: string, value: any) => void; }> = ({ tempSettings, handleInputChange }) => {
  const [ramUnit, setRamUnit] = useState('GB');
  const [cacheUnit, setCacheUnit] = useState('GB');

  const mods = [
    { id: 1, name: 'Mod 1', version: '1.0.0', dateAdded: '2022-01-01', enabled: true },
    { id: 2, name: 'Mod 2', version: '1.2.0', dateAdded: '2022-02-15', enabled: false },
    // Add more mods here...
  ];

  return (
    <Accordion allowToggle>
      <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
        <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            RAM Allocation ({ramUnit})
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={4}>
          <Flex justifyContent="flex-end">
            <Text fontSize="sm" mb={2}>Set the amount of RAM allocated to the game.</Text>
          </Flex>
          <Flex align="center" gap="4">
            <Slider value={tempSettings.ram} onChange={(val) => handleInputChange('ram', val)} max={ramUnit === 'GB' ? 64 : 64000} min={1}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              value={tempSettings.ram}
              onChange={(e) => handleInputChange('ram', Number(e.target.value))}
              type="number"
              max={ramUnit === 'GB' ? 64 : 64000}
              min={1}
              width="100px"
              defaultValue={tempSettings.ram}
            />
            <Select value={ramUnit} onChange={(e) => setRamUnit(e.target.value)} width="150px">
              <option value="GB">GB</option>
              <option value="MB">MB</option>
            </Select>
          </Flex>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
        <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            Cache Size ({cacheUnit})
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={4}>
          <Flex justifyContent="flex-end">
            <Text fontSize="sm" mb={2}>Set the amount of cache size allocated to the game.</Text>
          </Flex>
          <Flex align="center" gap="4">
            <Slider value={tempSettings.cache} onChange={(val) => handleInputChange('cache', val)} max={cacheUnit === 'GB' ? 1024 : 1048576} min={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              value={tempSettings.cache}
              onChange={(e) => handleInputChange('cache', Number(e.target.value))}
              type="number"
              max={cacheUnit === 'GB' ? 1024 : 1048576}
              min={0}
              width="100px"
              defaultValue={tempSettings.cache}
            />
            <Select value={cacheUnit} onChange={(e) => setCacheUnit(e.target.value)} width="150px">
              <option value="GB">GB</option>
              <option value="MB">MB</option>
            </Select>
          </Flex>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
        <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            JVM Arguments
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={4}>
          <Flex justifyContent="flex-end">
            <Text fontSize="sm" mb={2}>Set the JVM arguments for the game.</Text>
          </Flex>
          <Input
            value={tempSettings.jvmArgs}
            onChange={(e) => handleInputChange('jvmArgs', e.target.value)}
            defaultValue={tempSettings.jvmArgs}
          />
          <Tooltip label="For example: -Xmx1024m -Xms512m">
            <Text fontSize="sm" mt="2">Common JVM Arguments: -Xmx&lt;size&gt;m -Xms&lt;size&gt;m</Text>
          </Tooltip>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md">
        <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            Modifications
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={4}>
          <Flex justifyContent="flex-end">
            <Text fontSize="sm" mb={2}>Enable or disable game modifications.</Text>
          </Flex>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Enable</Th>
                <Th>Name</Th>
                <Th>Version</Th>
                <Th>Date Added</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mods.map((mod) => (
                <Tr key={mod.id}>
                  <Td><Switch isChecked={mod.enabled} onChange={(e) => handleInputChange(`mod_${mod.id}_enabled`, e.target.checked)} /></Td>
                  <Td>{mod.name}</Td>
                  <Td>{mod.version}</Td>
                  <Td>{mod.dateAdded}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const OtherSettings: React.FC = () => (
  <Accordion allowToggle>
    <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md">
      <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
        <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
          Additional Settings
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <Text>Explore additional settings and configurations.</Text>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState(75);
  const [tempSettings, setTempSettings] = useState({ theme: 'light', notifications: true, volume: 75, ram: 8, cache: 512, jvmArgs: '' });
  const [isModified, setIsModified] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadSettings = async () => {
      const defaultSettings = await invoke<{ theme: string; notifications: boolean; volume: number; ram: number; cache: number; jvmArgs: string }>('get_all_settings');
      setTheme(defaultSettings.theme);
      setNotifications(defaultSettings.notifications);
      setVolume(defaultSettings.volume);
      setTempSettings(defaultSettings);
    };

    loadSettings();
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
              <Text fontSize="2xl">General Settings</Text>
              <Text>Adjust your general preferences and system behavior.</Text>
            </Box>
            <GeneralSettings tempSettings={tempSettings} handleInputChange={handleInputChange} />
          </TabPanel>
          <TabPanel>
            <Box mb={4}>
              <Text fontSize="2xl">System Settings</Text>
              <Text>Configure system-related settings.</Text>
            </Box>
            <SystemSettings />
          </TabPanel>
          <TabPanel>
            <Box mb={4}>
              <Text fontSize="2xl">Game Settings</Text>
              <Text>Manage game-specific settings including RAM and cache allocation.</Text>
            </Box>
            <GameSettings tempSettings={tempSettings} handleInputChange={handleInputChange} />
          </TabPanel>
          <TabPanel>
            <Box mb={4}>
              <Text fontSize="2xl">Other Settings</Text>
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
