import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <Box>
      <Button onClick={() => changeLanguage('en')} m={1}>English</Button>
      <Button onClick={() => changeLanguage('ru')} m={1}>Русский</Button>
    </Box>
  );
};

export default LanguageSwitcher;
