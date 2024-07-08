import React, { useState } from 'react';
import { Box, Heading, VStack, Container } from '@chakra-ui/react';
import ProductList from '../components/ProductList';
import FilterBar from '../components/FilterBar';
import { useTranslation } from 'react-i18next';
import Skeleton from '../utils/Skeleton';

const Store: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (category: string) => {
    if (category !== filter) {
      setIsLoading(true);
      setTimeout(() => {
        setFilter(category);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <Container maxW="container.xl" p="4" minH="100vh" display="flex" flexDirection="column">
      <VStack spacing="5" align="stretch" flex="1">
        <Box mb={4} textAlign="center">
          <Heading as="h1" size="2xl" fontWeight="bold" color="teal.500">{t('store')}</Heading>
        </Box>
        <Box mb={4}>
          <FilterBar handleCategoryChange={handleCategoryChange} filter={filter} />
        </Box>
        <Box flex="1" position="relative">
          {isLoading ? (
            <Skeleton />
          ) : (
            <ProductList filter={filter} />
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Store;
