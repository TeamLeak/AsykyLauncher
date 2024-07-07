import React from 'react';
import {
    Box, Checkbox, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useColorModeValue
} from '@chakra-ui/react';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import LanguageSwitcher from '../utils/LanguageSwitcher';

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

export default GeneralSettings;
