import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Globe } from 'react-feather';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Menu>
            <MenuButton as={IconButton} icon={<Globe />} aria-label="Change language" />
            <MenuList>
                <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage('ru')}>Русский</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default LanguageSwitcher;
