// Theme settings
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
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
