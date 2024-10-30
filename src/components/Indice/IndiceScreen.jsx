import { Add, Search } from '@mui/icons-material';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import IndiceTable from './IndiceTable';
import { Filter } from './Filter';
import useAxios from '../../hooks/useAxios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const IndiceScreen = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, loading, sendRequest } = useAxios({
    path: `/indice-inflacion/${selectedDate}`,
    method: 'GET',
    initValue: null,
  });

  const findItem = () => {
    sendRequest();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Indice de Inflación</Typography>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%', mb: 2 }}
                variant="outlined"
                label="Periodo"
                views={['year', 'month']}
                yearsOrder="desc"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
            <Tooltip title="Buscar">
              <IconButton sx={{ width: 60, height: 60 }} onClick={findItem}>
                <Search color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
          {data && selectedDate && (
            <>
              <Typography>
                <strong>Periodo: </strong>
                {dayjs(data?.periodo || '').format('MM/YYYY')}
              </Typography>
              <Typography>
                <strong>Inflacion: </strong>
                {data?.indInflacion || ''}%
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

          <IndiceTable
            filter={filter}
            setOpenEditForm={setOpen}
            openEditFrom={open}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default IndiceScreen;
