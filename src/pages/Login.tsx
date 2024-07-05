import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await invoke('login', { username, password });
        if (response === "Login successful") {
            toast({
                title: t('loginSuccessful'),
                description: t('loginSuccessMessage'),
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } else {
            toast({
                title: t('loginFailed'),
                description: t('loginFailureMessage'),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>{t('username')}</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>{t('password')}</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt={4}>
                    {t('login')}
                </Button>
            </form>
        </Box>
    );
};

export default Login;
