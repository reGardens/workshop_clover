import React, { useState } from "react";
// import {Head, usePage} from '@inertiajs/inertia-react'
// for inertia v1
import { Head } from "@inertiajs/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/theme.js";
import Sidebar from "@/Components/Backoffice/Shared/Sidebar.jsx";
import Topbar from "@/Components/Backoffice/Shared/Topbar.jsx";
import Notification from "@/Components/Backoffice/Shared/Notification.jsx";
import { SnackbarProvider } from "notistack";

export default function Backend({ children, title = null }) {
    const [theme, colorMode] = useMode();

    return (
        <>
            <Head title={title ?? "CMS"} />
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={5}>
                        <CssBaseline />
                        <div className="app">
                            <Sidebar />
                            <main className="content">
                                <Topbar />
                                {children}
                            </main>
                        </div>
                        <Notification />
                        {/* <ScrollTop /> */}
                    </SnackbarProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
}
