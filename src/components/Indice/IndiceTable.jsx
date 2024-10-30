import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Box, IconButton, Modal, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { CustomConfirmDeleteDialog } from '../../shared/components/CustomConfirmDeleteDialog';
import { style } from '../../shared/ModalStyle';
import IndiceForm from './IndiceForm';
import dayjs from 'dayjs'

const IndiceTable = ({ setOpenEditForm, openEditFrom, filter }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      field: 'periodo',
      headerName: 'Periodo',
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.periodo}>{dayjs(row?.periodo || '').format('MM/YYYY')}</Tooltip>
      ),
    },
    {
      field: 'indInflacion',
      headerName: 'Inflacion',
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.indInflacion}>{row?.indInflacion || ''}%</Tooltip>
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
                handleClickOpenEditForm(row);
              }}
            >
              <EditOutlined color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Eliminar'}>
            <IconButton
              onClick={() => {
                handleClickOpenDeleteDialog(row);
              }}
            >
              <DeleteOutline color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleClickOpenDeleteDialog = (row) => {
    setSelected(row);
    setOpen(true);
  };

  const handleClickOpenEditForm = (row) => {
    setSelected(row);
    setOpenEditForm(true);
    setEditing(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEditForm(false);
    setEditing(false);
    setSelected({});
  };

  const { data, loading, sendRequest } = useAxios({
    path: `/indice-inflacion?search=${filter?.search || ''}`,
    method: 'GET',
    initValue: [],
  });

  const { sendRequest: onDelete } = useAxios({
    path: `/indice-inflacion/${selected?.id}`,
    method: 'DELETE',
    finallyCB: () => handleClose(),
    catchCB: (errorMessage) => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    },
    tryCB: () => {
      setRefresh((prevVal) => !prevVal);
      enqueueSnackbar('Deleted successfully!', {
        variant: 'success',
      });
    },
  });

  useEffect(() => {
    sendRequest();
  }, [refresh, filter]);

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
          <IndiceForm
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
        title={selected?.address || ''}
      />
    </div>
  );
};

export default IndiceTable;