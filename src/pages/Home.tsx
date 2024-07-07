import {Box, Button, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'react-feather';

const Home = () => {
    const {t} = useTranslation();

    return (
        <Box p={5} maxW="lg" mx="auto">
            <Text fontSize="2xl" mb={4} textAlign="center">
                {t('welcome')}
            </Text>
            <VStack spacing={4}>
                <Button as={Link} to="/login" colorScheme="teal" size="lg" rightIcon={<ArrowRight/>}>
                    {t('login')}
                </Button>
                <Button as={Link} to="/progress" colorScheme="blue" size="lg" rightIcon={<ArrowRight/>}>
                    {t('progress')}
                </Button>
                <Button as={Link} to="/settings" colorScheme="blue" size="lg" rightIcon={<ArrowRight/>}>
                    {t('Settings')}
                </Button>
            </VStack>
        </Box>
    );
};

export default Home;
