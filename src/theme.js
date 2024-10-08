import { createTheme } from '@mui/material/styles';

export const getTheme = (mode, direction) => createTheme({
  direction: direction,
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#a0a0a0' : '#7b2cbf',
    },
    secondary: {
      main: mode === 'dark' ? '#ffffff' : '#dc004e',
    },
    background: {
      default: mode === 'dark' ? '#303030' : '#fafafa',
      paper: mode === 'dark' ? '#424242' : '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Cairo, Arial',
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#ffffff' : '#000000', 
          '& a': {
            color: mode === 'dark' ? '#ffffff' : '#000000',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#ffffff' : '#000000',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});
