import React from 'react';
import { HStack, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface FilterBarProps {
  handleCategoryChange: (category: string) => void;
  filter: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ handleCategoryChange, filter }) => {
  const { t } = useTranslation();
  const categories = [
    { name: t('popular'), key: 'popular' },
    { name: t('discounted'), key: 'discount' },
    { name: t('recentlyAdded'), key: 'recent' },
    { name: t('allProducts'), key: 'all' }
  ];

  return (
    <HStack spacing="4" justifyContent="center">
      {categories.map(category => (
        <Button
          key={category.key}
          variant={filter === category.key ? 'solid' : 'outline'}
          onClick={() => handleCategoryChange(category.key)}
        >
          {category.name}
        </Button>
      ))}
    </HStack>
  );
};

export default FilterBar;
