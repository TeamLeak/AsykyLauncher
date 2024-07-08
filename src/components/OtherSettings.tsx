import React from 'react';
import {
    Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text, useColorModeValue
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const OtherSettings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Accordion allowToggle>
            <AccordionItem border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} borderRadius="md">
                <AccordionButton _expanded={{ bg: useColorModeValue('gray.100', 'gray.700') }} px={4} py={2}>
                    <Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
                        {t('otherSettings.additional')}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} px={4}>
                    <Text>{t('otherSettings.description')}</Text>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default OtherSettings;
