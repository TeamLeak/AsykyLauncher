import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, useToast } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import Progress from './pages/Progress';
import Home from './pages/Home';
import Register from './pages/Register';
import SelectPlayer from './pages/SelectPlayer';
import Settings from './pages/Settings';
import Store from './pages/Store';
import Header from './components/Header';
import Skeleton from './utils/Skeleton';
import { listen } from '@tauri-apps/api/event';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isThemeChanging] = useState(false);
  const toast = useToast();

  useEffect(() => {
    console.log('Listening for logout events');
    const unlisten = listen<string>('logout', event => {
      console.log('Logout event received:', event);
      toast({
        title: 'Logged out',
        description: event.payload,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    });

    return () => {
      console.log('Cleaning up logout listener');
      unlisten.then(f => f());
    };
  }, [toast]);

  useEffect(() => {
    console.log('Setting loading timeout');
    setTimeout(() => {
      console.log('Loading finished');
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Language change detected');
      setShowSpinner(true);
      setTimeout(() => {
        console.log('Language change applied');
        setShowSpinner(false);
      }, 1000);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      console.log('Cleaning up language change listener');
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);

  return (
    <ChakraProvider>
      <UserProvider>
        <Flex direction="column" minHeight="100vh" position="relative">
          <Header />
          <Flex flex="1" direction="column" align="center" justify="center">
            {(showSpinner || isThemeChanging || isLoading) ? (
              <Skeleton />
            ) : (
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/register" element={<Register />} />
                <Route path="/accounts" element={<SelectPlayer />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/store" element={<Store />} />
              </Routes>
            )}
          </Flex>
        </Flex>
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
