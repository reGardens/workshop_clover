import React, { useState } from "react";
// import {Head, usePage} from '@inertiajs/inertia-react'
// for inertia v1
import { Head } from "@inertiajs/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/theme.js";
import Notification from "@/Components/Backoffice/Shared/Notification.jsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SnackbarProvider } from "notistack";

export default function Backend({ children, title = null }) {
    const [theme, colorMode] = useMode();

    return (
        <>
            <Head title={title ?? "CMS"} />
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={5}>
                        <GoogleReCaptchaProvider
                            reCaptchaKey={
                                import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY
                            }
                        >
                            <CssBaseline />
                            <div className="app">
                                <main className="content">{children}</main>
                            </div>
                            <Notification />
                        </GoogleReCaptchaProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
}
