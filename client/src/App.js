import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Landing from "./components/layout/Landing";
import LoginPage from "./components/layout/LoginPage";
import Dashboard from "./components/layout/Dashboard";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#003d00",
      main: "#33691e",
      light: "#629749"
		}
  }
});

function App() {
  return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/dashboard" component={Dashboard} />
				</div>
			</Router>
		</ThemeProvider>
  );
}

export default App;
