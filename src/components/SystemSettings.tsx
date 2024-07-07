import React from 'react';
import {
    Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text, useColorModeValue
} from '@chakra-ui/react';

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

export default SystemSettings;
