import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material'
import React from 'react'

export const CustomConfirmDeleteDialog = ({
  open,
  handleClose,
  onDelete,
  title,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Are you sure you want to delete "${title}"?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Once deleted it cannot be restored
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button color='error' variant='contained' onClick={() => onDelete()} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
