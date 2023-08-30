import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import {
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

export default function Index({ roles }) {
    // untuk edit
    const handleEdit = (id) => {
        router.get(route("cms.access.role.edit", { role: id }));
    };
    // untuk delete modal confirm delete
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [routeDelete, setRouteDelete] = useState("");
    const handleDelete = (id) => {
        setOpenConfirmDelete(true);
        setRouteDelete(route("cms.access.role.delete", { role: id }));
    };
    // -----------
    // pagination
    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        roles.meta.current_page < newPage + 1
            ? router.get(
                  roles.links.next,
                  {
                      ...(getUrlSearchParameter("size") && {
                          size: getUrlSearchParameter("size"),
                      }),
                  },
                  { preserveScroll: true, preserveState: true }
              )
            : router.get(
                  roles.links.prev,
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
            route("cms.access.role.index"),
            { size: +event.target.value },
            { preserveScroll: true, preserveState: true }
        );
    };
    // -----------

    return (
        <Box m="20px">
            <Header title={`Role Management`} subtitle={`Manage role`}></Header>
            <Box display="flex" justifyContent="start" mt="20px" gap="5px">
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={() => router.get(route("cms.access.role.create"))}
                >
                    Create Role
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Permission(s)</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.data.map((role, index) => (
                            <TableRow
                                key={`${role.name} ${index}`}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>
                                    {role.permissions.map((permission) => (
                                        <div
                                            key={permission}
                                            className="text-center"
                                        >
                                            {permission}
                                            <br />
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align="right" className="!space-x-2">
                                    <Button
                                        color="neutral"
                                        variant="contained"
                                        onClick={() => handleEdit(role.id)}
                                        className="mt-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="danger"
                                        variant="contained"
                                        onClick={() => handleDelete(role.id)}
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
                count={roles.meta.total}
                rowsPerPage={roles.meta.per_page}
                page={roles.meta.current_page - 1}
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

Index.layout = (page) => <Backend children={page} title="Role Management" />;
