import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "verdana, arial, helvetica, sans-serif",
  },
});

export default theme;
