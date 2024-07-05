import { IconButton, useColorMode } from '@chakra-ui/react';
import { Moon, Sun } from 'react-feather';

const ThemeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <Moon /> : <Sun />}
            onClick={toggleColorMode}
        />
    );
};

export default ThemeSwitcher;
