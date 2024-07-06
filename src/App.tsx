import React, { useState, useEffect } from 'react';
import { Box, Flex, Fade } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import Progress from './pages/Progress';
import Home from './pages/Home';
import LanguageSwitcher from './utils/LanguageSwitcher';
import ThemeSwitcher from './utils/ThemeSwitcher';
import Skeleton from './utils/Skeleton';
import Register from "./pages/Register";
import SelectPlayer from "./pages/SelectPlayer.tsx";

const App: React.FC = () => {
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

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

    return (
        <Flex direction="column" minHeight="80vh" position="relative">
            <Flex justifyContent="flex-end" p={4} position="fixed" top={0} right={0} zIndex={1}>
                <ThemeSwitcher />
                <Box mx={2}></Box>
                <LanguageSwitcher />
            </Flex>
            <Flex flex="1" direction="column" align="center" justify="center">
                {showSpinner ? (
                    <Skeleton />
                ) : (
                    <Fade in={!isLoading}>
                        <Box width="100%" textAlign="center">
                            {isLoading ? (
                                <Skeleton />
                            ) : (
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/progress" element={<Progress />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/selectplayer" element={<SelectPlayer />} />
                                </Routes>
                            )}
                        </Box>
                    </Fade>
                )}
            </Flex>
        </Flex>
    );
};

export default App;
