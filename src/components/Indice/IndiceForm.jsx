import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Add, Edit } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useSnackbar } from 'notistack';

const IndiceForm = ({
  element = {},
  isEditing = false,
  setIsEditing,
  setRefresh,
  setOpen,
}) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({ mode: 'onChange', defaultValues: element });

  const [selectedDate, setSelectedDate] = useState(
    element?.fecha ? dayjs(element.fecha) : null
  );

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    data.periodo = selectedDate;
    isEditing ? onUpdate(data) : onCreate(data);
  };

  const { loading, sendRequest: onCreate } = useAxios({
    path: '/indice-inflacion',
    method: 'POST',
    finallyCB: () => setIsEditing(false),
    catchCB: (errorMessage) => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    },
    tryCB: () => {
      setRefresh((prevVal) => !prevVal);
      setOpen(false);
      enqueueSnackbar('Created successfully!', {
        variant: 'success',
      });
    },
  });

  const { loading: loadingEdit, sendRequest: onUpdate } = useAxios({
    path: `/indice-inflacion/${element?.id}`,
    method: 'PUT',
    finallyCB: () => setIsEditing(false),
    catchCB: (errorMessage) => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    },
    tryCB: () => {
      setRefresh((prevVal) => !prevVal);
      setOpen(false);
      enqueueSnackbar('Edited successfully!', {
        variant: 'success',
      });
    },
  });

  return (
    <Box>
      <Typography variant="h5">{`${
        isEditing ? 'Edit' : 'Add'
      } Indice de Inflacion`}</Typography>
      <form style={{ marginTop: 25 }} onSubmit={handleSubmit(onSubmit)}>
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
        <Controller
          control={control}
          name="indInflacion"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Inflacion"
              variant="outlined"
              defaultValue={element?.indInflacion || ''}
            />
          )}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: '100%', mb: 2 }}
            label="Fecha"
            //maxDate={currentYear}
            openTo="year"
            views={['year', 'month']}
            variant="outlined"
            yearsOrder="desc"
            value={element?.fecha || ''}
          />
        </LocalizationProvider> */}
        <LoadingButton
          loading={loading || loadingEdit}
          loadingPosition="start"
          disabled={!isValid}
          startIcon={isEditing ? <Edit /> : <Add />}
          type="submit"
          sx={{ mt: 3, height: 50 }}
          variant="contained"
          fullWidth
        >
          {isEditing ? 'Update' : 'Add'}
        </LoadingButton>
      </form>
    </Box>
  );
};

export default IndiceForm;
