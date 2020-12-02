import "./App.css";
import Home from "./pages/Home";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import theme from "./util/theme";
import axios from "axios";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

axios.defaults.baseURL = "https://whispering-crag-05145.herokuapp.com/";

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Home />
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
