import React from 'react';
import {
  Box, Checkbox, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, useColorModeValue, Skeleton
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import LanguageSwitcher from '../utils/LanguageSwitcher';

const GeneralSettings: React.FC<{
  tempSettings: { theme: string; notifications: boolean } | null;
  handleInputChange: (key: string, value: any) => void;
}> = ({ tempSettings, handleInputChange }) => {
  const { t } = useTranslation();

  if (!tempSettings) {
    return <Skeleton height="20px" width="100%" />;
  }

  return (
    <Accordion allowToggle>
      <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
        <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            {t('generalSettings.theme')}
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
            {t('generalSettings.notifications')}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={4}>
          <Checkbox isChecked={tempSettings.notifications} onChange={(e) => handleInputChange('notifications', e.target.checked)}>
            {t('generalSettings.enableNotifications')}
          </Checkbox>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md">
        <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
          <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
            {t('generalSettings.language')}
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
};

export default GeneralSettings;
