import { Box, Text, Flex, Spacer } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Progress from './pages/Progress';
import Home from './pages/Home';
import LanguageSwitcher from './utils/LanguageSwitcher';
import ThemeSwitcher from './utils/ThemeSwitcher';

const App = () => {
    return (
        <Box>
            <Flex justifyContent="space-between" p={4}>
                <Spacer />
                <Box textAlign="center">
                    <Text fontSize="2xl">MyApp</Text>
                </Box>
                <Spacer />
                <Flex>
                    <ThemeSwitcher />
                    <Box mx={2}></Box>
                    <LanguageSwitcher />
                </Flex>
            </Flex>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/progress" element={<Progress />} />
            </Routes>
        </Box>
    );
};

export default App;
