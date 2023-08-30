import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/Components/Backoffice/Header";

export default function Create({ permissions }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, reset, errors, post } = useForm({
        name: "",
        permissions: [],
    });

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.access.role.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // reset()
            },
        });
    };

    return (
        <Box m="20px">
            <Header title={`Create Role`} subtitle={`Create new role`} />
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                        },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onChange={handleChange}
                        name="name"
                        value={data.name}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.permissions}
                    >
                        <InputLabel id="permissions-label" variant="filled">
                            Select Roles
                        </InputLabel>
                        <Select
                            labelId="permissions-label"
                            id="permissions"
                            multiple
                            value={data.permissions}
                            name="permissions"
                            onChange={handleChange}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {permissions.map((permission, index) => (
                                <MenuItem
                                    key={permission.id + index}
                                    value={permission.name}
                                >
                                    {permission.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {!!errors.permissions && (
                            <FormHelperText error={!!errors.permissions}>
                                {errors.permissions}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

Create.layout = (page) => <Backend children={page} title="Create Role" />;
