import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { router } from '@inertiajs/react';

export default function ConfirmDeleteDialog({arrUser, openConfirmDelete, setOpenConfirmDelete, isBulkDelete, setIsBulkDelete, route}) {

  const handleClose = () => {
    setOpenConfirmDelete(false)
  };

  const handleDelete = () => {
    if(!isBulkDelete){
      router.delete(route, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          setOpenConfirmDelete(false)
        }
      })
    } else {
      router.post(route, {id: arrUser}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          setIsBulkDelete(false)
          setOpenConfirmDelete(false)
        }
      })
    }
  }

  return (
    <Dialog
      open={openConfirmDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete Action
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure to continue this action ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='neutral' onClick={handleClose} autoFocus>Cancel</Button>
        <Button color='danger' onClick={handleDelete}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}