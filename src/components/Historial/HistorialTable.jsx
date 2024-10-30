import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Box, IconButton, Modal, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { CustomConfirmDeleteDialog } from '../../shared/components/CustomConfirmDeleteDialog';
import { style } from '../../shared/ModalStyle';
import HistorialForm from './HistorialForm';

const HistorialTable = ({ setOpenEditForm, openEditFrom, filter }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      field: 'cedula',
      headerName: 'Cedula',
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.cedula}>{row?.cedula || ''}</Tooltip>
      ),
    },
    {
      field: 'rnc',
      headerName: 'RNC',
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.rnc}>{row?.rnc || ''}</Tooltip>
      ),
    },
    {
      field: 'concepto',
      headerName: 'Concepto',
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.concepto}>{row?.concepto || ''}</Tooltip>
      ),
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.fecha}>{row?.fecha || ''}</Tooltip>
      ),
    },
    {
      field: 'montoTotal',
      headerName: 'Monto total adeudado',
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.montoTotal}>
          {row?.montoTotal || ''}
        </Tooltip>
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
    path: `/historial-crediticio?search=${filter?.search || ''}`,
    method: 'GET',
    initValue: [],
  });

  const { sendRequest: onDelete } = useAxios({
    path: `/historial-crediticio/${selected?.id}`,
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
          <HistorialForm
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

export default HistorialTable;
