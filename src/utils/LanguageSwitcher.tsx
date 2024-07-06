import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'react-feather';
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Box } from '@chakra-ui/react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box position="relative">
      <Menu>
        <MenuButton as={IconButton} icon={<Globe />} aria-label="Change language" />
        <MenuList>
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('ru')}>Русский</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
