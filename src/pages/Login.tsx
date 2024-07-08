import { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Divider, Text, AbsoluteCenter, Link as ChakraLink } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ArrowForwardIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { open } from '@tauri-apps/api/shell';

const Login = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log("Sending login request", { username, password });
            const response = await invoke('authenticate_user', { username, password });
            console.log("Response from authenticate_user:", response);

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
                throw new Error("Failed to login");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast({
                title: t('loginFailed'),
                description: t('loginFailureMessage'),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleLoginWithSite = async () => {
        await open('http://localhost:1420/login');
    };

    return (
        <Box p={5} maxW="md" mx="auto">
            <Text fontSize="2xl" mb={4} textAlign="center">{t('welcome')}</Text>
            <Text fontSize="sm" mb={8} textAlign="center">{t('pleaseLoginToContinue')}</Text>
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

            <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" width="full" mb={4} onClick={handleLoginWithSite}>
                {t('loginWithSite')}
            </Button>
            <Text mt={4} textAlign="center">
                {t('noAccount')}{' '}
                <ChakraLink as={RouterLink} to="/register" color="teal.500">
                    {t('createAccount')}
                </ChakraLink>
            </Text>
        </Box>
    );
};

export default Login;
