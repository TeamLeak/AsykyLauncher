import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'react-feather';
import Skeleton from './Skeleton';
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Box } from '@chakra-ui/react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (lng: string) => {
    setIsLoading(true);
    i18n.changeLanguage(lng).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  };

  return (
    <Box position="relative">
      {isLoading ? (
        <Skeleton />
      ) : (
        <Menu>
          <MenuButton as={IconButton} icon={<Globe />} aria-label="Change language" />
          <MenuList>
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('ru')}>Русский</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default LanguageSwitcher;
