import { createTheme } from '@mui/material/styles';

const appTheme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    button: {
      fontWeight: 700,
      transform: 'none',
      letterSpacing: 0.6,
    },
    fontSize: 12,
  },
});

export default appTheme;
