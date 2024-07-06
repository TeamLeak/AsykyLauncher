// ThemeSwitcher.tsx
import { IconButton, useColorMode, Box } from '@chakra-ui/react';
import { Moon, Sun } from 'react-feather';

interface ThemeSwitcherProps {
    onToggleStart: () => void;
    onToggleEnd: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onToggleStart, onToggleEnd }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const handleToggle = () => {
        onToggleStart();
        setTimeout(() => {
            toggleColorMode();
            setTimeout(() => {
                onToggleEnd();
            }, 300);
        }, 150);
    };

    return (
        <Box position="relative">
            <IconButton
                aria-label="Toggle theme"
                icon={colorMode === 'light' ? <Moon /> : <Sun />}
                onClick={handleToggle}
            />
        </Box>
    );
};

export default ThemeSwitcher;
