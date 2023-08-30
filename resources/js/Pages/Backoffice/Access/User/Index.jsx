import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import {
    Avatar,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { router } from "@inertiajs/react";
import { getUrlSearchParameter } from "@/Utils/helper";
import ConfirmDeleteDialog from "@/Components/Backoffice/ConfirmDeleteDialog";

export default function Index({ users }) {
    // untuk edit
    const handleEdit = (id) => {
        router.get(route("cms.access.user.edit", { user: id }));
    };
    // untuk delete modal confirm delete
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [routeDelete, setRouteDelete] = useState("");
    const handleDelete = (id) => {
        setOpenConfirmDelete(true);
        setRouteDelete(route("cms.access.user.delete", { user: id }));
    };
    // -----------
    // pagination
    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        users.meta.current_page < newPage + 1
            ? router.get(
                  users.links.next,
                  {
                      ...(getUrlSearchParameter("size") && {
                          size: getUrlSearchParameter("size"),
                      }),
                  },
                  { preserveScroll: true, preserveState: true }
              )
            : router.get(
                  users.links.prev,
                  {
                      ...(getUrlSearchParameter("size") && {
                          size: getUrlSearchParameter("size"),
                      }),
                  },
                  { preserveScroll: true, preserveState: true }
              );
    };
    const handleChangeRowsPerPage = (event) => {
        router.get(
            route("cms.access.user.index"),
            { size: +event.target.value },
            { preserveScroll: true, preserveState: true }
        );
    };
    // -----------

    return (
        <Box m="20px">
            <Header title={`User Management`} subtitle={`Manage user`}></Header>
            <Box display="flex" justifyContent="start" mt="20px" gap="5px">
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={() => router.get(route("cms.access.user.create"))}
                >
                    Create User
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.data.map((user, index) => (
                            <TableRow
                                key={`${user.name} ${index}`}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>
                                    <Avatar
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            cursor: "pointer",
                                        }}
                                        src={user.avatar}
                                    />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align="right" className="!space-x-2">
                                    <Button
                                        color="neutral"
                                        variant="contained"
                                        onClick={() =>
                                            handleEdit(user.username)
                                        }
                                        className="mt-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="danger"
                                        variant="contained"
                                        onClick={() =>
                                            handleDelete(user.username)
                                        }
                                        className="mt-2"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 100]}
                component="div"
                count={users.meta.total}
                rowsPerPage={users.meta.per_page}
                page={users.meta.current_page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ConfirmDeleteDialog
                openConfirmDelete={openConfirmDelete}
                setOpenConfirmDelete={setOpenConfirmDelete}
                route={routeDelete}
            />
        </Box>
    );
}

Index.layout = (page) => <Backend children={page} title="User Management" />;
