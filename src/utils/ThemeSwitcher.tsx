// ThemeSwitcher.tsx
import {Button, useColorMode, Box} from '@chakra-ui/react';

interface ThemeSwitcherProps {
    onToggleStart: () => void;
    onToggleEnd: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({onToggleStart, onToggleEnd}) => {
    const {colorMode, toggleColorMode} = useColorMode();

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
        <Box position="relative" display="flex" alignItems="center" gap="2">
            <Button
                onClick={handleToggle}
                colorScheme={colorMode === 'dark' ? 'teal' : 'gray'}
                variant={colorMode === 'dark' ? 'solid' : 'outline'}
            >
                Dark
            </Button>
            <Button
                onClick={handleToggle}
                colorScheme={colorMode === 'light' ? 'teal' : 'gray'}
                variant={colorMode === 'light' ? 'solid' : 'outline'}
            >
                Light
            </Button>
        </Box>
    );
};

export default ThemeSwitcher;
