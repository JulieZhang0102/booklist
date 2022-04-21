import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    purple: {
      main: "#6c749f",
      contrastText: "#fff",
    },
    pink: {
      main: "#f7eef0",
    },
  },
  typography: {
    h6: {
      color: "#f7eef0",
    },
    h5: {
      color: "#6c749f",
    },
  },
});

export default theme;
