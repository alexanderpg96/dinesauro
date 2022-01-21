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
    MuiTypography: {
      styleOverrides: {
        h2: {
          fontWeight: "800",
        },
        h3: {
          fontWeight: "800",
        },
        h4: {
          fontWeight: "800",
        },
        h6: {
          fontWeight: "800",
        },
      },
    },
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
        outlined: {
          color: "#78D9AE",
          borderWidth: "2.5px",
          padding: "10px 12px",
          width: "100%",
          "&:hover": {
            borderWidth: "2.5px",
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
