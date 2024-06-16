import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Box, IconButton, Modal, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import React, { useState, useEffect } from 'react'
import useAxios from '../../hooks/useAxios'
import { CustomConfirmDeleteDialog } from '../../shared/components/CustomConfirmDeleteDialog'
import { style } from '../../shared/ModalStyle'
import AddressForm from './AddressForm'

const AddressTable = ({ setOpenEditForm, openEditFrom, filter }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [isEditing, setEditing] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const columns = [
    {
      field: 'client',
      headerName: 'Client',
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip
          title={`${row?.client?.name || ''} ${row?.client?.lastName || ''}`}
        >
          {row?.client?.name || ''} {row?.client?.lastName || ''}
        </Tooltip>
      ),
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.address}>{row?.address || ''}</Tooltip>
      ),
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.city}>{row?.city || ''}</Tooltip>
      ),
    },
    {
      field: 'state',
      headerName: 'State',
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.state}>{row?.state || ''}</Tooltip>
      ),
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.country}>{row?.country || ''}</Tooltip>
      ),
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.zipCode}>{row?.zipCode || ''}</Tooltip>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <Tooltip title={'Editar'}>
            <IconButton
              onClick={() => {
                handleClickOpenEditForm(row)
              }}
            >
              <EditOutlined color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Eliminar'}>
            <IconButton
              onClick={() => {
                handleClickOpenDeleteDialog(row)
              }}
            >
              <DeleteOutline color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  const handleClickOpenDeleteDialog = (row) => {
    setSelected(row)
    setOpen(true)
  }

  const handleClickOpenEditForm = (row) => {
    setSelected(row)
    setOpenEditForm(true)
    setEditing(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenEditForm(false)
    setEditing(false)
    setSelected({})
  }

  const { data, loading, sendRequest } = useAxios({
    path: `/address?search=${filter?.search || ''}&clientId=${filter?.clientId || ''}`,
    method: 'GET',
    initValue: [],
  })

  const { sendRequest: onDelete } = useAxios({
    path: `/address/${selected?.id}`,
    method: 'DELETE',
    finallyCB: () => handleClose(),
    catchCB: (errorMessage) => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
    },
    tryCB: () => {
      setRefresh((prevVal) => !prevVal)
      enqueueSnackbar('Deleted successfully!', {
        variant: 'success',
      })
    },
  })

  useEffect(() => {
    sendRequest()
  }, [refresh, filter])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        loading={loading}
        disableColumnMenu
        disableRowSelectionOnClick
        checkboxSelection
      />

      <Modal open={openEditFrom} onClose={handleClose}>
        <Box sx={style}>
          <AddressForm
            setRefresh={setRefresh}
            setIsEditing={setEditing}
            isEditing={isEditing}
            setOpen={setOpenEditForm}
            element={selected}
          />
        </Box>
      </Modal>

      <CustomConfirmDeleteDialog
        open={open}
        handleClose={handleClose}
        onDelete={onDelete}
        title={selected?.name}
      />
    </div>
  )
}

export default AddressTable
