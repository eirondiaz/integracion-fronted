import { Add, Search } from '@mui/icons-material';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import TasaTable from './TasaTable';
import { Filter } from './Filter';
import useAxios from '../../hooks/useAxios';

const TasaScreen = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [findItemText, setFindItemText] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, loading, sendRequest } = useAxios({
    path: `/tasa-cambiaria/${findItemText}`,
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
        <Typography variant="h5">Tasa Cambiaria</Typography>
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
              label="Codigo de Moneda"
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
          {(data && findItemText) && (
            <>
              <Typography>
                <strong>Codigo de moneda: </strong>
                {data?.codigoMoneda || ''}
              </Typography>
              <Typography>
                <strong>Tasa: </strong>
                {data?.tasa || ''}
              </Typography>
            </>
          )}
          {(!data) && (
            <>
              <Typography>
                No se encontraron datos
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ width: '70%' }}>
          <Filter setFilter={setFilter} />

          <TasaTable
            filter={filter}
            setOpenEditForm={setOpen}
            openEditFrom={open}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TasaScreen;
