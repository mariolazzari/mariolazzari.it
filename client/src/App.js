import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setLocale, setFlag } from "redux/slices/appSlice";
// App routings
import { BrowserRouter } from "react-router-dom";
import Routes from "components/Routes";
// theme
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
// locale
import { IntlProvider } from "react-intl";
// components
import MenuBar from "components/MenuBar";
import Footer from "components/Footer";

// component
const App = () => {
  // Redux
  const { locale, messages } = useSelector(state => ({
    locale: state.app.locale,
    messages: state.app.messages,
  }));
  const dispatch = useDispatch();

  // load locales
  useEffect(() => {
    let userLocale = "en";
    if (navigator.language) {
      const tokens = navigator.language.split("-");
      userLocale = tokens[0] === "it" ? "it" : "en";
    }
    dispatch(setLocale(userLocale));
    dispatch(setFlag(userLocale));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages.get(locale)}>
        <BrowserRouter>
          <CssBaseline />
          <MenuBar />
          <Routes />
          <Footer />
        </BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
