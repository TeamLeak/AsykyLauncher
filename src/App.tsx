import { Box, Button, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Progress from './pages/Progress.tsx';

const Home = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Box p={5}>
            <Text fontSize="xl">{t('welcome')}</Text>
            <Button colorScheme="teal" mt={4}>{t('clickMe')}</Button>
            <Button onClick={() => changeLanguage('en')} mt={4}>English</Button>
            <Button onClick={() => changeLanguage('ru')} mt={4}>Русский</Button>
            <Button as={Link} to="/login" mt={4}>{t('login')}</Button>
            <Button as={Link} to="/progress" mt={4}>{t('progress')}</Button>
        </Box>
    );
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/progress" element={<Progress />} />
        </Routes>
    );
};

export default App;
