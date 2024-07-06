import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript, Box, Text } from "@chakra-ui/react";
import { I18nextProvider } from 'react-i18next';
import i18n from './lang/i18n';
import { BrowserRouter } from 'react-router-dom';
import theme from './utils/theme';

const rootElement = document.getElementById("root") as HTMLElement;

const renderApp = () => {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <I18nextProvider i18n={i18n}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </I18nextProvider>
            </ChakraProvider>
        </React.StrictMode>
    );
};

const renderError = () => {
    ReactDOM.createRoot(rootElement).render(
        <ChakraProvider theme={theme}>
            <Box textAlign="center" mt="50px">
                <Text fontSize="2xl" color="red.500">
                    This application can only be run inside the Tauri environment.
                </Text>
            </Box>
        </ChakraProvider>
    );
};

if (window.__TAURI__) {
    renderApp();
} else {
    renderError();
}
