// Theme settings
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#d40000",
    },
    secondary: {
      main: "#000",
    },
  },
});

export default responsiveFontSizes(theme);
