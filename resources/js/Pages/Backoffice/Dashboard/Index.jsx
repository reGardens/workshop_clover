import React, { useEffect, useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Header from "@/components/Backoffice/Header";
import { Link, router, usePage } from "@inertiajs/react";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import MarginOutlinedIcon from "@mui/icons-material/MarginOutlined";
import FestivalRoundedIcon from "@mui/icons-material/FestivalRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BadgeIcon from "@mui/icons-material/Badge";
import EditOffIcon from "@mui/icons-material/EditOff";
import { tokens } from "@/theme";
import { hasAnyPermission } from "@/Utils/helper.js";

export default function Index(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [count, setCount] = useState({
        users_count: props.users_count,
        roles_count: props.roles_count,
        permissions_count: props.permissions_count,
    });

    const user = usePage().props.auth.user;

    useEffect(() => {
        const fetchData = async () => {
            // Make an API call to fetch updated data from the server
            const updatedData = await fetchUpdatedData();
            setCount(updatedData.data);
        };

        const pollingInterval = setInterval(fetchData, 5000); // Polling interval of 5 seconds (adjust as needed)

        return () => {
            clearInterval(pollingInterval); // Clean up the interval on component unmount
        };
    }, []);

    const fetchUpdatedData = async () => {
        const response = await fetch(route("cms.dashboard", { p: props.pol }));
        const updatedData = await response.json();
        return updatedData;
    };

    return (
        <Box sx={{ m: "20px" }}>
            <Header
                title={`Welcome Back ${user.name}`}
                subtitle={`Your Role ${user.role.map(
                    (role, index) => role.name + " "
                )} `}
            />

            <Typography variant="h2" sx={{ fontSize: 25 }} gutterBottom>
                Dashboard
            </Typography>

            {hasAnyPermission([
                "user management",
                "role management",
                "permission management",
            ]) && (
                <Stack
                    sx={{ mt: 2 }}
                    direction={{ xs: "column", lg: "row" }}
                    spacing={2}
                    flexWrap={"no-wrap"}
                    useFlexGap
                >
                    <Box sx={{ width: "100%" }}>
                        <Typography
                            variant="h2"
                            sx={{ fontSize: 25, mt: 5 }}
                            gutterBottom
                        >
                            User, Permission, Role Management
                        </Typography>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            flexWrap={isNonMobile ? "no-wrap" : "wrap"}
                            useFlexGap
                        >
                            <Stack
                                direction={"column"}
                                spacing={2}
                                flexGrow={1}
                            >
                                {hasAnyPermission(["user management"]) && (
                                    <Card
                                        sx={{
                                            minWidth: 275,
                                            backgroundColor:
                                                colors.primary[400],
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Link
                                            href={route(
                                                "cms.access.user.index"
                                            )}
                                        >
                                            <Button
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography
                                                        sx={{ fontSize: 20 }}
                                                        color="text.secondary"
                                                    >
                                                        <ManageAccountsIcon />{" "}
                                                        <span>Users</span>
                                                    </Typography>
                                                    <Typography
                                                        sx={{ fontSize: 20 }}
                                                        color="text.secondary"
                                                        align="center"
                                                    >
                                                        {count.users_count}
                                                    </Typography>
                                                </CardContent>
                                            </Button>
                                        </Link>
                                    </Card>
                                )}
                                {hasAnyPermission(["role management"]) && (
                                    <Card
                                        sx={{
                                            minWidth: 275,
                                            backgroundColor:
                                                colors.primary[400],
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Link
                                            href={route(
                                                "cms.access.role.index"
                                            )}
                                        >
                                            <Button
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography
                                                        sx={{ fontSize: 20 }}
                                                        color="text.secondary"
                                                    >
                                                        <BadgeIcon />{" "}
                                                        <span>Roles</span>
                                                    </Typography>
                                                    <Typography
                                                        sx={{ fontSize: 20 }}
                                                        color="text.secondary"
                                                        align="center"
                                                    >
                                                        {count.roles_count}
                                                    </Typography>
                                                </CardContent>
                                            </Button>
                                        </Link>
                                    </Card>
                                )}
                            </Stack>
                            <Box sx={{ flexGrow: 1 }}>
                                {hasAnyPermission([
                                    "permission management",
                                ]) && (
                                    <Card
                                        sx={{
                                            minWidth: 275,
                                            height: "100%",
                                            backgroundColor:
                                                colors.primary[400],
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Link
                                            href={route(
                                                "cms.access.permission.index"
                                            )}
                                        >
                                            <Button
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography
                                                        sx={{ fontSize: 20 }}
                                                        color="text.secondary"
                                                    >
                                                        <EditOffIcon />{" "}
                                                        <span>Permissions</span>
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: 50,
                                                            mt: 4,
                                                        }}
                                                        color="text.secondary"
                                                        align="center"
                                                        gutterBottom
                                                    >
                                                        {
                                                            count.permissions_count
                                                        }
                                                    </Typography>
                                                </CardContent>
                                            </Button>
                                        </Link>
                                    </Card>
                                )}
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            )}

            {/* Jika Belum Memiliki Permission */}
            {!hasAnyPermission() && (
                <Typography
                    color={colors.redAccent[500]}
                    variant="h3"
                    sx={{ fontSize: 22 }}
                    align="center"
                >
                    Anda Belum Memiliki Permission Untuk Management Pada System
                    CMS Ini.
                </Typography>
            )}
        </Box>
    );
}

Index.layout = (page) => <Backend children={page} title="Dashboard CMS" />;
