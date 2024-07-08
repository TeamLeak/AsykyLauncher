import React from 'react';
import { Box, Image, Text, Badge, Flex, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  title: string;
  description: string;
  rating: number;
  price: string;
  image: string;
  discount?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, rating, price, image, discount }) => {
  const { t } = useTranslation();

  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('black', 'white');
  const descriptionColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const starColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="2" w="250px" bg={bg} color={color} whiteSpace="normal" borderColor={borderColor}>
      <Image src={image} alt={title} objectFit="cover" height="150px" width="full" />

      <Box p="4">
        <VStack align="start" spacing={2}>
          <Text fontSize="lg" fontWeight="bold" isTruncated>
            {title}
          </Text>
          <Text fontSize="sm" color={descriptionColor}>
            {description}
          </Text>
          <Flex align="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon key={i} color={i < rating ? 'teal.500' : starColor} />
              ))}
          </Flex>
          <HStack justify="space-between" width="full">
            <Text fontSize="xl" fontWeight="bold">
              {price}
            </Text>
            {discount && (
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {t('productDiscount')}
              </Badge>
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
