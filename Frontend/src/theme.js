import { createTheme } from '@mui/material/styles';

const lightPrimaryColor = 'rgba(118, 155, 249, 0.67)';
const lightSecondaryColor = '#FF0000';

const darkPrimaryColor = 'rgba(118, 155, 249, 0.67)';
const darkSecondaryColor = '#FF0000';

const lightBackgroundColor = '#FFFFFF'; // Light mode background color
const darkBackgroundColor = '#121212'; // Dark mode background color

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightPrimaryColor,
    },
    secondary: {
      main: lightSecondaryColor,
    },
    background: {
      default: lightBackgroundColor, // Set default background color for light mode
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: darkPrimaryColor,
    },
    secondary: {
      main: darkSecondaryColor,
    },
    background: {
      default: darkBackgroundColor, // Set default background color for dark mode
    },
  },
});

export { lightTheme, darkTheme };
