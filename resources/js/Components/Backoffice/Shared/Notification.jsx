import { usePage } from "@inertiajs/react";
import { Alert, Snackbar } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useEffect, useState } from "react";

export default function Notification() {
    const { flash, errors } = usePage().props;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (flash.alert) setOpen(true);
        if (errors[500]) {
            Object.entries(errors[500]).map(([key, value]) => {
                enqueueSnackbar(value, {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            });
        }
    }, [flash.alert, errors[500]]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            {flash.alert && (
                <Alert
                    onClose={handleClose}
                    severity={flash.alert?.type}
                    sx={{ width: "100%" }}
                    variant="filled"
                    elevation={6}
                >
                    {flash.alert?.message}
                </Alert>
            )}
        </Snackbar>
    );
}
