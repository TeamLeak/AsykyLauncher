import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Container, Divider, Text, Input, HStack, Button } from '@chakra-ui/react';
import ProductList from '../components/ProductList';
import productsData from '../utils/products.json';
import { useTranslation } from 'react-i18next';

const Store: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [visibleCategories, setVisibleCategories] = useState({
    popular: true,
    discount: true,
    all: true
  });
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    const filteredProducts = (filter: string) => {
      let filteredProducts = productsData as any[];
      if (filter === 'discount') {
        filteredProducts = filteredProducts.filter(product => product.discount);
      } else if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === filter);
      }
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return filteredProducts;
    };

    setVisibleCategories({
      popular: filteredProducts('popular').length > 0,
      discount: filteredProducts('discount').length > 0,
      all: filteredProducts('all').length > 0,
    });
  }, [searchQuery]);

  const renderProductList = (filter: string) => {
    const effectiveFilter = searchQuery ? 'all' : filter;
    return (
      <ProductList
        filter={effectiveFilter}
        searchQuery={searchQuery}
        page={currentPage}
        productsPerPage={productsPerPage}
        loading={loading}
      />
    );
  };

  return (
    <Container maxW="container.xl" p="4" minH="100vh" display="flex" flexDirection="column">
      <VStack spacing="5" align="stretch" flex="1">
        <Box mb={4} textAlign="center">
          <Heading as="h1" size="2xl" fontWeight="bold" color="white">{t('store')}</Heading>
        </Box>
        <HStack spacing="4" mb="4" justify="center">
          <Input
            placeholder={t('search')}
            value={searchQuery}
            onChange={handleSearchChange}
            width="300px"
          />
        </HStack>
        <Divider />
        {!searchQuery && currentPage === 1 && visibleCategories.popular && (
          <Box mb={4}>
            <Text fontSize="2xl" fontWeight="bold" color="white">{t('popular')}</Text>
            {renderProductList('popular')}
          </Box>
        )}
        {!searchQuery && currentPage === 1 && visibleCategories.popular && <Divider />}
        {!searchQuery && currentPage === 1 && visibleCategories.discount && (
          <Box mb={4}>
            <Text fontSize="2xl" fontWeight="bold" color="white">{t('discounted')}</Text>
            {renderProductList('discount')}
          </Box>
        )}
        {!searchQuery && currentPage === 1 && visibleCategories.discount && <Divider />}
        {visibleCategories.all && (
          <Box mb={4}>
            <Text fontSize="2xl" fontWeight="bold" color="white">{t('allProducts')}</Text>
            {renderProductList('all')}
          </Box>
        )}
        <HStack spacing="2" justify="center" mt="4">
          {[...Array(Math.ceil(productsData.length / productsPerPage)).keys()].map(number => (
            <Button
              key={number}
              onClick={() => handlePageChange(number + 1)}
              variant={currentPage === number + 1 ? 'solid' : 'outline'}
            >
              {number + 1}
            </Button>
          ))}
        </HStack>
      </VStack>
    </Container>
  );
};

export default Store;
