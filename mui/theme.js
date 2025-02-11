// ** MUI Imports
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#2B2B2B",
      white: "#ffffff",
    },
    primary: {
      main: "#8c6cf2",
      light: "#9d81f4",
      dark: "#5b2ded",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff0000",
      light: "#ff5252",
      dark: "#c20000",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffdd00",
      light: "#ffea00",
      dark: "#ffd000",
      contrastText: "#ffffff",
    },
    info: {
      main: "#48cae4",
      light: "#ade8f4",
      dark: "#00b4d8",
      contrastText: "#ffffff",
    },
    success: {
      main: "#3EC70B",
      light: "#3EC70B",
      dark: "#3EC70B",
      contrastText: "#ffffff",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161",
    },
    text: {
      primary: "#2B2B2B",
      secondary: "#2B2B2B",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.05)",
    background: {
      dark: "#000000",
      light: "#ffffff",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 700,
      fontSize: "2.15rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 600,
      fontSize: "1.80rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 500,
      fontSize: "1.60rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 500,
      fontSize: "1.20rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 300,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 300,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
    caption: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 300,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontFamily: ["Poppins", "Roboto", "Helvetica", "sans-serif"].join(","),
      fontWeight: 300,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#ff5252",
          "&$error": {
            color: "#ff5252",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
