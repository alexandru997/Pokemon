import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {store} from "./app/store.ts";
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme.ts";
import Layout from "./components/Layout.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                   <Layout>
                        <App/>
                   </Layout>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
    ,
)
