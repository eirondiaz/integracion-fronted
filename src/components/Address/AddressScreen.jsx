import { Add } from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddressTable from './AddressTable'
import { Filter } from './Filter'

const AddressScreen = () => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Address Managment</Typography>
        <Tooltip title="Agregar">
          <IconButton onClick={handleOpen}>
            <Add color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Filter setFilter={setFilter} />

      <AddressTable
        filter={filter}
        setOpenEditForm={setOpen}
        openEditFrom={open}
      />
    </Box>
  )
}

export default AddressScreen
