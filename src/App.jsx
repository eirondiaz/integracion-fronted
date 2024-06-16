import { Box } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import TabNav from './components/TabNav/TabNavScreen'

function App() {
  return (
    <Box sx={{ paddingX: 20, paddingY: 4 }}>
      <SnackbarProvider>
        <TabNav />
      </SnackbarProvider>
    </Box>
  )
}

export default App
