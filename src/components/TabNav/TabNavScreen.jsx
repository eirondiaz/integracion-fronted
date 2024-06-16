import { Box, Tab, Tabs } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddressScreen from '../Address/AddressScreen'
import ClientScreen from '../Clients/ClientScreen'

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TabNav = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Clients" {...a11yProps(0)} />
          <Tab label="Address" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ClientScreen />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddressScreen />
      </CustomTabPanel>
    </Box>
  )
}

export default TabNav
