import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Divider, Text, AbsoluteCenter, Link as ChakraLink } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ArrowForwardIcon, EmailIcon, LockIcon, AtSignIcon } from '@chakra-ui/icons';

const Register = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: t('registrationFailed'),
                description: t('passwordMismatch'),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const response = await invoke('register', { username, email, password });
        if (response === "Register successful") {
            toast({
                title: t('registrationSuccessful'),
                description: t('registrationSuccessMessage'),
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } else {
            toast({
                title: t('registrationFailed'),
                description: t('registrationFailureMessage'),
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
                    <FormLabel>{t('username')}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <AtSignIcon />
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
                    <FormLabel>{t('email')}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <EmailIcon />
                        </InputLeftElement>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                <FormControl mt={4}>
                    <FormLabel>{t('confirmPassword')}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <LockIcon />
                        </InputLeftElement>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            isRequired
                        />
                    </InputGroup>
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full" mt={4}>
                    {t('register')}
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
                {t('alreadyHaveAccount')}{' '}
                <ChakraLink as={RouterLink} to="/login" color="teal.500">
                    {t('login')}
                </ChakraLink>
            </Text>
        </Box>
    );
};

export default Register;
