import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { Box } from '@mui/material';

const Test = () => {
    const outerTheme = createTheme({
        palette: {
          primary: {
            main: orange[500],
          },
        },
      });
  return (
    <ThemeProvider theme={outerTheme}>
    <Box style={{width: '200px', height: '200px'}}>Test</Box>
    </ThemeProvider>
  )
}

export default Test