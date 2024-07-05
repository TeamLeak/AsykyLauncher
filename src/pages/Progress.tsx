import { useState, useEffect } from 'react';
import { Box, Progress, Text } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useTranslation } from 'react-i18next';

const ProgressComponent = () => {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(async () => {
            const newProgress = await invoke('update_progress');
            setProgress(newProgress as number);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box p={5}>
            <Text fontSize="xl">{t('progress')}</Text>
            <Progress value={progress} size="lg" colorScheme="teal" mt={4} />
            <Text mt={4}>{progress}%</Text>
        </Box>
    );
};

export default ProgressComponent;
