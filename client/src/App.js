import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getUserData } from "./actions/authActions";
import isEmpty from "is-empty";
import cookies from "js-cookie";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Landing from "./components/layout/Landing";
import LoginPage from "./components/layout/LoginPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#003d00",
      main: "#33691e",
      light: "#629749"
		},
  }
});

function App() {
	const token = cookies.get("user");

  const [isLoggedIn, setLoggedIn] = useState(!isEmpty(token));
  const [user, setUser] = useState({
		firstName: "",
		lastName: "",
	});
	
  useEffect(() => {
    if (isLoggedIn) {
      const getUserPayload = async () => {
        const data = await getUserData(token);
				const userPayload = await data.payload;
				
        setUser({
					firstName: userPayload.firstName,
					lastName: userPayload.lastName
        });
      }

      getUserPayload();
    }
	}, [isLoggedIn, token]);

	const handleLoggedIn = async stillLoggedIn => {
		if (stillLoggedIn) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}

	const dashboardPage = () => {
		return (
			<Dashboard userData={user} loggedIn={isLoggedIn} />
		);
	}

  return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Navbar userData={user} loggedIn={isLoggedIn} changeLoggedIn={handleLoggedIn} />
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/dashboard" render={dashboardPage} />
				</div>
			</Router>
		</ThemeProvider>
  );
}

export default App;
