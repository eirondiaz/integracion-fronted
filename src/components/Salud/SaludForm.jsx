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
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useSnackbar } from 'notistack';

const SaludForm = ({
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
  const [isValidCedula, setIsValidCedula] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    setIsValidCedula(validaCedula(data?.cedula))
    if (!validaCedula(data?.cedula)) return
    isEditing ? onUpdate(data) : onCreate(data);
  };

  const { loading, sendRequest: onCreate } = useAxios({
    path: '/salud-financiera',
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
    path: `/salud-financiera/${element?.id}`,
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

  const validaCedula = (pCedula) => {
    console.log(pCedula);
    let vnTotal = 0;
    let vcCedula = pCedula.replace(/-/g, '');
    let pLongCed = vcCedula.trim().length;
    let digitoMult = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];

    if (pLongCed !== 11) {
      return false;
    }

    for (let vDig = 1; vDig <= pLongCed; vDig++) {
      let vCalculo =
        parseInt(vcCedula.substring(vDig - 1, vDig)) * digitoMult[vDig - 1];
      if (vCalculo < 10) {
        vnTotal += vCalculo;
      } else {
        vnTotal +=
          parseInt(vCalculo.toString().substring(0, 1)) +
          parseInt(vCalculo.toString().substring(1, 1));
      }
    }

    return vnTotal % 10 === 0;
  };

  return (
    <Box>
      <Typography variant="h5">{`${
        isEditing ? 'Edit' : 'Add'
      } Salud financiera`}</Typography>
      <form style={{ marginTop: 25 }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="cedula"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!isValidCedula}
              helperText={!isValidCedula ? "Cedula invalida": ""}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Cedula"
              variant="outlined"
              defaultValue={element?.cedula || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="rnc"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="RNC"
              variant="outlined"
              defaultValue={element?.rnc || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="comentario"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Comentario"
              variant="outlined"
              defaultValue={element?.comentario || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="montoTotalAdeudado"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Monto Total Adeudado"
              variant="outlined"
              defaultValue={element?.montoTotalAdeudado || ''}
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

export default SaludForm;
