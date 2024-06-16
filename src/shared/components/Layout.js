import React from 'react'
//import './App.css'
import { Box, Grid, Typography } from '@mui/material'
//import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <Grid container>
      {/* <Grid item xs="2">
        <Sidebar />
      </Grid> */}
      <Grid item xs="12">
        <Box sx={{ padding: 6 }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  )
}
