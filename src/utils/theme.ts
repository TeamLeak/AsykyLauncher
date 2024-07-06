import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const styles = {
    global: (props: any) => ({
        body: {
            transitionProperty: 'background-color, color',
            transitionDuration: '0.2s',
            bg: props.colorMode === 'light' ? 'white' : 'gray.800',
            color: props.colorMode === 'light' ? 'black' : 'white',
        },
    }),
};

const theme = extendTheme({ config, styles });

export default theme;
