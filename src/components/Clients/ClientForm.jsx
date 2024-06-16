import { Box, Button, TextField, Typography } from '@mui/material'
import { Add, Edit } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import useAxios from '../../hooks/useAxios'
import { useSnackbar } from 'notistack'
import { LoadingButton } from '@mui/lab'

const ClientForm = ({
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
  } = useForm({ mode: 'onChange', defaultValues: element })

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data) => {
    isEditing ? onUpdate(data) : onCreate(data)
  }

  const { loading, sendRequest: onCreate } = useAxios({
    path: '/clients',
    method: 'POST',
    finallyCB: () => setIsEditing(false),
    catchCB: (errorMessage) => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
    },
    tryCB: () => {
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
      enqueueSnackbar('Created successfully!', {
        variant: 'success',
      })
    },
  })

  const { loading: loadingEdit, sendRequest: onUpdate } = useAxios({
    path: `/clients/${element?.id}`,
    method: 'PUT',
    finallyCB: () => setIsEditing(false),
    catchCB: (errorMessage) => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
    },
    tryCB: () => {
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
      enqueueSnackbar('Edited successfully!', {
        variant: 'success',
      })
    },
  })

  return (
    <Box>
      <Typography variant="h5">{`${
        isEditing ? 'Edit' : 'Add'
      } Client`}</Typography>
      <form style={{ marginTop: 25 }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Name"
              variant="outlined"
              defaultValue={element?.name || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Last name"
              variant="outlined"
              defaultValue={element?.lastName || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Email"
              variant="outlined"
              defaultValue={element?.email || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Phone number"
              type="number"
              variant="outlined"
              defaultValue={element?.phoneNumber || ''}
            />
          )}
        />
        {/* <Button
          disabled={!isValid || loading || loadingEdit}
          endIcon={isEditing ? <Edit /> : <Add />}
          type="submit"
          sx={{ mt: 3, height: 50 }}
          variant="contained"
          fullWidth
        >
          {isEditing ? 'Update' : 'Add'}
        </Button> */}
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
  )
}

export default ClientForm
