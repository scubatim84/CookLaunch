import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Landing from "./components/layout/Landing";
import Dashboard from "./components/layout/Dashboard"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003d00"
		},
		secondary: {
			main: "#33691e"
		}
  }
});

function App() {
  return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/dashboard" component={Dashboard} />
				</div>
			</Router>
		</ThemeProvider>
  );
}

export default App;
