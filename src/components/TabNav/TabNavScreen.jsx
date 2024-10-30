import { Box, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TasaScreen from '../Tasa/TasaScreen';
import SaludScreen from '../Salud/SaludScreen';
import HistorialScreen from '../Historial/HistorialScreen';
import IndiceScreen from '../Indice/IndiceScreen';

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
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabNav = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tasa cambiaria" {...a11yProps(0)} />
          <Tab label="Indice de Inflacion" {...a11yProps(1)} />
          <Tab label="Salud Financiera" {...a11yProps(2)} />
          <Tab label="Historial Crediticio" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TasaScreen />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IndiceScreen />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SaludScreen />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <HistorialScreen />
      </CustomTabPanel>
    </Box>
  );
};

export default TabNav;
