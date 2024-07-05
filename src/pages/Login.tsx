import React, { useState } from 'react';
import {Box, Button, Input, FormControl, FormLabel, useToast, Divider, Text, AbsoluteCenter} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputGroup, InputLeftElement } from '@chakra-ui/react';
import {ArrowForwardIcon, EmailIcon, LockIcon} from "@chakra-ui/icons";

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
        <Box p={5} maxW="md" mx="auto">
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>{t('usernameOrEmail')}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <EmailIcon />
                        </InputLeftElement>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            isRequired
                        />
                    </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>{t('password')}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <LockIcon />
                        </InputLeftElement>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isRequired
                        />
                    </InputGroup>
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full" mt={4}>
                    {t('login')}
                </Button>
            </form>

            <Box position='relative' padding='10'>
                <Divider />
                <AbsoluteCenter px='4'>
                    {t('or')}
                </AbsoluteCenter>
            </Box>

            <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" width="full" mb={4}>
                {t('loginWithSite')}
            </Button>
            <Text mt={4} textAlign="center">
                {t('noAccount')} <Link to="/register">{t('createAccount')}</Link>
            </Text>
        </Box>
    );
};

export default Login;
