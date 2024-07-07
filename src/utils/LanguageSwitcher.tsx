import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@chakra-ui/react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box>
      <Button onClick={() => changeLanguage('en')} m={1}>English</Button>
      <Button onClick={() => changeLanguage('ru')} m={1}>Русский</Button>
    </Box>
  );
};

export default LanguageSwitcher;
