import { Add, Search } from '@mui/icons-material';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import SaludTable from './SaludTable';
import { Filter } from './Filter';
import useAxios from '../../hooks/useAxios';

const SaludScreen = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [findItemText, setFindItemText] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, loading, sendRequest } = useAxios({
    path: `/salud-financiera/${findItemText}`,
    method: 'GET',
    initValue: null,
  });

  console.log(data);

  const findItem = () => {
    sendRequest();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Salud Financiera</Typography>
        <Tooltip title="Agregar">
          <IconButton onClick={handleOpen}>
            <Add color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            width: '30%',
            mr: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              required
              sx={{ width: '100%', mb: 2 }}
              label="Cedual o RNC"
              variant="outlined"
              onChange={(e) => setFindItemText(e.target.value)}
              value={findItemText}
            />
            <Tooltip title="Buscar">
              <IconButton sx={{ width: 60, height: 60 }} onClick={findItem}>
                <Search color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
          {data && findItemText && (
            <>
              <Typography>
                <strong>Cedula: </strong>
                {data?.cedula || ''}
              </Typography>
              <Typography>
                <strong>RNC: </strong>
                {data?.rnc || ''}
              </Typography>
              <Typography>
                <strong>Comentario: </strong>
                {data?.comentario || ''}
              </Typography>
              <Typography>
                <strong>Monto total adeudado: </strong>
                {data?.montoTotalAdeudado || ''}
              </Typography>
            </>
          )}
          {!data && (
            <>
              <Typography>No se encontraron datos</Typography>
            </>
          )}
        </Box>
        <Box sx={{ width: '70%' }}>
          <Filter setFilter={setFilter} />

          <SaludTable
            filter={filter}
            setOpenEditForm={setOpen}
            openEditFrom={open}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SaludScreen;