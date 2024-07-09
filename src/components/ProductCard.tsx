import React from 'react';
import {Box, Image, Text, Badge, Flex, VStack, HStack, Button, useColorModeValue} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons';
import {useTranslation} from 'react-i18next';

interface ProductCardProps {
    title: string;
    description: string;
    rating: number;
    price: string;
    image: string;
    discount?: boolean;
}

const getRandomColor = () => {
    const lightColors = ['#f0e5cf', '#e8d4b3', '#d6c7a1', '#c7b391', '#b39c79'];
    const darkColors = ['#4a5568', '#2d3748', '#1a202c', '#2c5282', '#2a4365'];
    const colors = useColorModeValue(lightColors, darkColors);
    return colors[Math.floor(Math.random() * colors.length)];
};

const ProductCard: React.FC<ProductCardProps> = ({title, description, rating, price, image, discount}) => {
    const {t} = useTranslation();

    const bg = getRandomColor();
    const color = useColorModeValue('black', 'white');
    const descriptionColor = useColorModeValue('gray.600', 'gray.400');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const starColor = useColorModeValue('gray.300', 'gray.600');

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            m="2"
            width="250px"
            height="350px"
            bg={bg}
            color={color}
            whiteSpace="normal"
            borderColor={borderColor}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Image src={image} alt={title} objectFit="cover" height="150px" width="full"/>

            <Box p="4" flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <VStack align="start" spacing={2} flex="1">
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
                                <StarIcon key={i} color={i < rating ? 'teal.500' : starColor}/>
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
                <Button colorScheme="green" width="full" mt="2" size="sm">
                    {t('buy')}
                </Button>
            </Box>
        </Box>
    );
};

export default ProductCard;
