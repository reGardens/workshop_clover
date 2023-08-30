import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import { AspectRatio } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    FormControl,
    ImageList,
    ImageListItem,
    TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { pink } from "@mui/material/colors";
import { useForm } from "@inertiajs/react";

const Create = () => {
    const { data, setData } = useForm({
        banner: "",
        name: "",
        narasumber: "",
        date: "",
        description: "",
        short_description: "",
    });

    const handleChange = (e) => {
        setData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    };
    console.log("first", data);

    const handleSave = () => {};
    return (
        <Box component="form" noValidate autoComplete="off">
            <Container>
                <form onSubmit={handleSave}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 20 + "px",
                            flexWrap: "wrap",
                        }}
                    >
                        <Box
                            sx={{
                                width: 100 + "%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <label htmlFor="image_upload">
                                <ImageList cols={1} sx={{ cursor: "pointer" }}>
                                    <img
                                        src={`https://placehold.co/300x250`}
                                        srcSet={`&dpr=2 2x`}
                                        // alt={item.title}
                                        loading="lazy"
                                        sx={{
                                            marginX: "auto",
                                        }}
                                    />
                                </ImageList>

                                <input
                                    tabIndex={3}
                                    type="file"
                                    id="image_upload"
                                    name="banner"
                                    hidden
                                    value={data.banner}
                                    onChange={handleChange}
                                />
                            </label>
                        </Box>

                        <TextField
                            required
                            id="filled-required"
                            label="Name"
                            variant="filled"
                            sx={{
                                width: 100 + "%",
                            }}
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="filled-required"
                            label="Narasumber"
                            variant="filled"
                            sx={{
                                width: 49 + "%",
                            }}
                            name="narasumber"
                            value={data.narasumber}
                            onChange={handleChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{ width: 49 + "%" }}
                                name="date"
                                value={data.date}
                                onChange={handleChange}
                            />
                        </LocalizationProvider>
                        <TextField
                            required
                            id="filled-required"
                            label="Description"
                            variant="filled"
                            sx={{
                                width: 100 + "%",
                            }}
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="filled-required"
                            label="Short Description"
                            variant="filled"
                            sx={{
                                width: 100 + "%",
                            }}
                            value={data.short_description}
                            name="short_description"
                            onChange={handleChange}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            marginY: 20 + "px",
                            gap: 10 + "px",
                        }}
                    >
                        <Button
                            sx={{
                                color: "#91C8E4",
                                background: pink[500],
                            }}
                        >
                            Reset
                        </Button>

                        <Button
                            sx={{
                                background: "#91C8E4",
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default Create;

Create.layout = (page) => <Backend children={page} title={"post management"} />;
