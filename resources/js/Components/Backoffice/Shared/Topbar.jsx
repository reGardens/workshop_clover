import React, { useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "@/theme.js";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Logout, Settings } from "@mui/icons-material";
import { Link, router, usePage } from "@inertiajs/react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const { auth } = usePage().props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        router.post(route("cms.logout"));
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                alignItems="center"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                padding="5px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton
                    type="button"
                    sx={{ p: 1, height: "25px", width: "25px" }}
                >
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                {/* <Tooltip title="Dark Mode">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip> */}
                {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}
                {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar
                            src={auth.user.avatar ?? null}
                            sx={{ width: 35, height: 35 }}
                        >
                            {auth.user.name[0]}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Link
                        href={route("cms.profile.edit")}
                        className="flex items-center w-full h-8"
                    >
                        <Avatar src={auth.user.avatar ?? null}>
                            {auth.user.name[0]}
                        </Avatar>
                        <Typography className="text-base font-bold">
                            {auth.user.name}
                        </Typography>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose;
                        router.get(route("cms.profile.password.edit"));
                    }}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Change password
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        handleLogout();
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Topbar;
