import { Add } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ClientTable from './ClientTable'
import { Filter } from './Filter'

const ClientScreen = () => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Client Managment</Typography>
        <Tooltip title="Agregar">
          {/* <Button
            onClick={handleOpen}
            size="small"
            variant="contained"
            startIcon={<Add />}
          >
            Add
          </Button> */}
          <IconButton onClick={handleOpen}>
            <Add color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Filter setFilter={setFilter} />

      <ClientTable
        filter={filter}
        setOpenEditForm={setOpen}
        openEditFrom={open}
      />
    </Box>
  )
}

export default ClientScreen
