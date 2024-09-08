import { createTheme } from '@mui/material/styles';

export const getTheme = (mode, direction) => createTheme({
  direction: direction,
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#f48fb1' : '#dc004e',
    },
    background: {
      default: mode === 'dark' ? '#303030' : '#fafafa',
      paper: mode === 'dark' ? '#424242' : '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});
