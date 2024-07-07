import React, { useState } from 'react';
import {
    Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Switch, useColorModeValue, Tooltip
} from '@chakra-ui/react';

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

export default GameSettings;
