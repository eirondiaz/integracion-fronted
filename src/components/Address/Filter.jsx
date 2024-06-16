import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import useAxios from '../../hooks/useAxios'

export const Filter = ({ setFilter }) => {
  const [debouncedFilter, setDebouncedFilter] = useState({})

  const handleChange = (e) => {
    const { value, name } = e.target

    setDebouncedFilter((prevVal) => ({
      ...prevVal,
      [name]: value,
    }))
  }

  const resetFilter = () => {
    setDebouncedFilter({})
    setFilter({})
  }

  const { data: clientList, sendRequest: getClients } = useAxios({
    path: '/clients',
    method: 'GET',
    initValue: [],
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(debouncedFilter)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [debouncedFilter])

  useEffect(() => {
    getClients()
  }, [])

  return (
    <Box
      sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'space-between' }}
    >
      <Box>
        <TextField
          sx={{ width: 200, mr: 2 }}
          label="Search"
          placeholder="Search by any field..."
          size="small"
          name="search"
          variant="outlined"
          value={debouncedFilter?.search || ''}
          onChange={handleChange}
        />
        <FormControl sx={{ width: 200 }} size="small">
          <InputLabel id="demo-simple-select-label">Client</InputLabel>
          <Select
            name="clientId"
            value={debouncedFilter?.clientId || ''}
            label="Client"
            onChange={handleChange}
          >
            {clientList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button size="small" variant="outlined" onClick={resetFilter}>
          Clear
        </Button>
      </Box>
    </Box>
  )
}
