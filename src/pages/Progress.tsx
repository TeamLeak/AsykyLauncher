import { useState, useEffect } from 'react';
import { Box, Progress, Text } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useTranslation } from 'react-i18next';

const ProgressComponent = () => {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const newProgress = await invoke<number>('update_progress');
                setProgress(newProgress);
                setError(null);
            } catch (err) {
                console.error("Error updating progress:", err);
                setError(t('error_updating_progress'));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [t]);

    return (
        <Box p={5}>
            <Text fontSize="xl">{t('progress')}</Text>
            <Progress value={progress} size="lg" colorScheme="teal" mt={4} />
            <Text mt={4}>{progress}%</Text>
            {error && (<Text color="red.500" mt={4}>{error}</Text>)}
        </Box>
    );
};

export default ProgressComponent;
