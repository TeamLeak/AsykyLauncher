import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import productsData from '../utils/products.json';
import Skeleton from '../utils/Skeleton';

interface Product {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: string;
  image: string;
  discount: boolean;
  category: string;
}

interface ProductListProps {
  filter: string;
  searchQuery: string;
  page: number;
  productsPerPage: number;
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ filter, searchQuery, page, productsPerPage, loading }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filteredProducts = productsData as Product[];
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
    setProducts(filteredProducts);
  }, [filter, searchQuery]);

  useEffect(() => {
    if ((filter === 'discount' || filter === 'popular') && !loading) {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.scrollLeft = 0; // Reset scroll position
        const totalScrollWidth = scrollContainer.scrollWidth;
        const scroll = () => {
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= totalScrollWidth) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1;
          }
        };
        const interval = setInterval(scroll, 13);
        return () => clearInterval(interval);
      }
    }
  }, [filter, products, loading]);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const productBoxStyle = { flex: '0 0 auto', width: '250px', mx: '2' };

  const renderProducts = () => {
    return currentProducts.map((product, index) => (
      <Box key={`${product.id}-${index}`} {...productBoxStyle}>
        <ProductCard
          title={product.title}
          description={product.description}
          rating={product.rating}
          price={product.price}
          image={product.image}
          discount={product.discount}
        />
      </Box>
    ));
  };

  return (
    <Box p="5" overflow="hidden" width="100%">
      {loading ? (
        <Skeleton />
      ) : filter === 'all' ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="2" justifyItems="center">
          {renderProducts()}
        </SimpleGrid>
      ) : (
        <Flex
          ref={scrollContainerRef}
          maxWidth="100%"
          whiteSpace="nowrap"
          overflowX="hidden"
          justifyContent="center"
        >
          {renderProducts()}
        </Flex>
      )}
    </Box>
  );
};

export default ProductList;
