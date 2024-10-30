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
import { Add, Edit } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { useSnackbar } from 'notistack';

const TasaForm = ({
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

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    isEditing ? onUpdate(data) : onCreate(data);
  };

  const { loading, sendRequest: onCreate } = useAxios({
    path: '/tasa-cambiaria',
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
    path: `/tasa-cambiaria/${element?.id}`,
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
      } Tasa`}</Typography>
      <form style={{ marginTop: 25 }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="codigoMoneda"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Codigo de Moneda"
              variant="outlined"
              defaultValue={element?.codigoMoneda || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="tasa"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Tasa"
              variant="outlined"
              defaultValue={element?.tasa || ''}
            />
          )}
        />
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

export default TasaForm;
