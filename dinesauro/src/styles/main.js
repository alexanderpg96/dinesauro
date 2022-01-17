import { createTheme } from "@mui/material";

export const mainStyleOverrides = createTheme({
  palette: {
    primary: {
      main: "#78D9AE",
    },
    secondary: {
      main: "#009267",
    },
  },
  typography: {
    fontFamily: `"Cairo", "sans-serif"`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          color: "#fff",
          fontWeight: "800",
          textTransform: "capitalize",
          boxShadow: "none",
          padding: "16px 0px",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:hover": {
            borderColor: "#78D9AE",
          },
          borderRadius: "15px",
        },
        outlined: {
          borderRadius: "15px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover": {
            borderColor: "#78D9AE",
          },
          borderRadius: "10px",
        },
      },
    },
  },
});
