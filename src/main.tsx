import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { I18nextProvider } from 'react-i18next';
import i18n from './lang/i18n.ts';
import { BrowserRouter } from 'react-router-dom';
import theme from './utils/theme';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
