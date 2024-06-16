import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Add, Edit } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import useAxios from '../../hooks/useAxios'
import { useSnackbar } from 'notistack'

const AddressForm = ({
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

  const { data: clientList, sendRequest: getClients } = useAxios({
    path: '/clients',
    method: 'GET',
    initValue: [],
  })

  const { loading, sendRequest: onCreate } = useAxios({
    path: '/address',
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
    path: `/address/${element?.id}`,
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

  useEffect(() => {
    getClients()
  }, [])

  return (
    <Box>
      <Typography variant="h5">{`${
        isEditing ? 'Edit' : 'Add'
      } Address`}</Typography>
      <form style={{ marginTop: 25 }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="clientId"
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl sx={{ mb: 2 }} fullWidth>
              <InputLabel id="demo-simple-select-label">Client</InputLabel>
              <Select
                {...field}
                required
                defaultValue={element?.client?.id || ''}
                label="Client"
              >
                {clientList.map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Address"
              variant="outlined"
              defaultValue={element?.address || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="City"
              variant="outlined"
              defaultValue={element?.city || ''}
            />
          )}
        />
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Controller
            control={control}
            name="state"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                sx={{ width: '100%', mr: 2 }}
                label="State"
                variant="outlined"
                defaultValue={element?.state || ''}
              />
            )}
          />
          <Controller
            control={control}
            name="zipCode"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                sx={{ width: '100%' }}
                label="Zip Code"
                type="number"
                variant="outlined"
                defaultValue={element?.zipCode || ''}
              />
            )}
          />
        </Box>
        <Controller
          control={control}
          name="country"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              sx={{ width: '100%', mb: 2 }}
              label="Country"
              variant="outlined"
              defaultValue={element?.country || ''}
            />
          )}
        />
        <Button
          disabled={!isValid || loading || loadingEdit}
          startIcon={isEditing ? <Edit /> : <Add />}
          type="submit"
          sx={{ mt: 3, height: 50 }}
          variant="contained"
          fullWidth
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </form>
    </Box>
  )
}

export default AddressForm
