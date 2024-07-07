import React, { useState, useEffect } from 'react';
import { Box, Flex, Fade } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import Progress from './pages/Progress';
import Home from './pages/Home';
import Skeleton from './utils/Skeleton';
import Register from "./pages/Register";
import SelectPlayer from "./pages/SelectPlayer.tsx";
import Settings from "./pages/Settings.tsx";

const App: React.FC = () => {
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const [isThemeChanging] = useState(false);

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
        <Flex direction="column" minHeight="100vh" position="relative">
            <Flex justifyContent="space-between" p={4} position="fixed" top={0} left={0} right={0} zIndex={1}>
            </Flex>
            <Flex flex="1" direction="column" align="center" justify="center">
                {(showSpinner || isThemeChanging || isLoading) ? (
                    <Skeleton />
                ) : (
                    <Fade in={!isLoading}>
                        <Box width="100%" textAlign="center">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/progress" element={<Progress />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/accounts" element={<SelectPlayer />} />
                                <Route path="/settings" element={<Settings />} />
                            </Routes>
                        </Box>
                    </Fade>
                )}
            </Flex>
        </Flex>
    );
};

export default App;
