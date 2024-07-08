import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import productsData from '../utils/products.json';

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
}

const ProductList: React.FC<ProductListProps> = ({ filter }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filteredProducts = productsData as Product[];
    if (filter === 'discount') {
      filteredProducts = filteredProducts.filter(product => product.category === 'discount');
    } else if (filter !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === filter);
    }
    setProducts(filteredProducts);
  }, [filter]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scroll = () => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      };
      const interval = setInterval(scroll, 20);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Box p="5" overflow="hidden" width="100%">
      <Flex
        ref={scrollContainerRef}
        maxWidth="100%"
        whiteSpace="nowrap"
        overflowX="hidden"
        justifyContent="center"
      >
        {products.map((product) => (
          <Box key={product.id} flex="0 0 auto" width="250px" mx="2">
            <ProductCard
              title={product.title}
              description={product.description}
              rating={product.rating}
              price={product.price}
              image={product.image}
              discount={product.discount}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default ProductList;
