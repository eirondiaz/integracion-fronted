import { Alert, Box, Button, Snackbar } from '@mui/material'
import React, { useState } from 'react'

export const CustomSnackBar = ({ openSnackbar = false, setOpenSnackbar }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  return (
    <Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          //variant="filled"
          sx={{ width: '100%' }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </Box>
  )
}
