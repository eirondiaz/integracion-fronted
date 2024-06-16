import { Box, Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'

export const Filter = ({ setFilter }) => {
  const [debouncedFilter, setDebouncedFilter] = useState({})

  const handleChange = (e) => {
    const { value, name } = e.target

    setDebouncedFilter((prevVal) => ({
      ...prevVal,
      [name]: value,
    }))
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(debouncedFilter)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [debouncedFilter])

  const resetFilter = () => {
    setDebouncedFilter({})
    setFilter({})
  }

  return (
    <Box
      sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'space-between' }}
    >
      <Box>
        <TextField
          sx={{ width: 200 }}
          label="Search"
          placeholder="Search by any field..."
          size="small"
          name="search"
          variant="outlined"
          value={debouncedFilter?.search || ''}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Button size="small" variant="outlined" onClick={resetFilter}>
          Clear
        </Button>
      </Box>
    </Box>
  )
}
