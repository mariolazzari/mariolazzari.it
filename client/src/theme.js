// Theme settings
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
  },
  palette: {
    primary: {
      main: indigo[800],
    },
    secondary: {
      main: indigo[50],
    },
  },
});

export default responsiveFontSizes(theme);
