import Backend from "@/Layouts/Backoffice/Backend";
import {
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    styled,
    tableCellClasses,
} from "@mui/material";
import React from "react";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { blue, pink } from "@mui/material/colors";
import { router } from "@inertiajs/react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const Index = ({ lists }) => {
    return (
        <Box>
            <Container>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ background: "#4682A9" }}
                    onClick={() => {
                        router.get(route("cms.sewing.post.create"));
                    }}
                >
                    Create
                    <AddIcon sx={{ color: "#F6F4EB" }} />
                </Button>
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Avatar</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">
                                    Narasumber
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Date
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Description
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Action
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lists.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={row.banner}
                                            sx={{ width: 40, height: 40 }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.narasumber}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.date}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.short_description}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton aria-label="EditIcon">
                                                <EditIcon
                                                    sx={{ color: blue[500] }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton aria-label="DeleteIcon">
                                                <DeleteIcon
                                                    sx={{ color: pink[500] }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default Index;

Index.layout = (page) => <Backend children={page} title="post management" />;
