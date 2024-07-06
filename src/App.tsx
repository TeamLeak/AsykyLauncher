import React, { useState, useEffect } from 'react';
import { Box, Flex, Fade } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import Progress from './pages/Progress';
import Home from './pages/Home';
import LanguageSwitcher from './utils/LanguageSwitcher';
import ThemeSwitcher from './utils/ThemeSwitcher';
import Skeleton from './utils/Skeleton';
import Register from "./pages/Register";
import SelectPlayer from "./pages/SelectPlayer.tsx";
import MenuIcon from './utils/MenuIcon';

const App: React.FC = () => {
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const [isThemeChanging, setIsThemeChanging] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSession = () => {
            const session = Boolean(localStorage.getItem('session'));
            console.log('Session:', session);
            setIsAuthenticated(session);
            setIsLoading(false);
        };

        setTimeout(checkSession, 2000);
    }, []);
что
    useEffect(() => {
        const handleLanguageChange = () => {
            setShowSpinner(true);
            setTimeout(() => {
                setShowSpinner(false);
            }, 1000);
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    const handleThemeToggleStart = () => {
        setIsThemeChanging(true);
    };

    const handleThemeToggleEnd = () => {
        setIsThemeChanging(false);
    };

    return (
        <Flex direction="column" minHeight="100vh" position="relative">
            <Flex justifyContent="space-between" p={4} position="fixed" top={0} left={0} right={0} zIndex={1}>
                <Box>
                    <MenuIcon setIsAuthenticated={setIsAuthenticated} /> {/* Иконка меню в левом верхнем углу */}
                </Box>
                <Flex>
                    <ThemeSwitcher onToggleStart={handleThemeToggleStart} onToggleEnd={handleThemeToggleEnd} />
                    <Box mx={2}></Box>
                    <LanguageSwitcher />
                </Flex>
            </Flex>
            <Flex flex="1" direction="column" align="center" justify="center">
                {(showSpinner || isThemeChanging || isLoading) ? (
                    <Skeleton />
                ) : (
                    <Fade in={!isLoading}>
                        <Box width="100%" textAlign="center">
                            <Routes>
                                {!isAuthenticated && <Route path="*" element={<Navigate to="/accounts" />} />}
                                {isAuthenticated && <Route path="/" element={<Navigate to="/home" />} />}
                                <Route path="/home" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/progress" element={<Progress />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/accounts" element={<SelectPlayer />} />
                            </Routes>
                        </Box>
                    </Fade>
                )}
            </Flex>
        </Flex>
    );
};

export default App;
