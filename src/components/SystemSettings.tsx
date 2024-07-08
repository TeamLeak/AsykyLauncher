import React from 'react';
import {
    Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text, useColorModeValue, Switch, FormControl, FormLabel
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const SystemSettings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Accordion allowToggle>
            <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md" mb={4}>
                <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
                    <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
                        {t('systemSettings.allowPreRelease')}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} px={4}>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="pre-release-updates" mb="0" flex="1" fontSize="sm">
                            {t('systemSettings.allowPreRelease')}
                        </FormLabel>
                        <Switch id="pre-release-updates" />
                    </FormControl>
                    <Text mt={2} fontSize="sm">
                        {t('systemSettings.allowPreReleaseDescription')}
                    </Text>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default SystemSettings;
