import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import isEmpty from "is-empty";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/layout/Dashboard"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
	const [user, setUser] = useState({
		user: {},
		isAuthenticated: false
	});

	const setCurrentUser = userData => {
		setUser({
			user: userData,
			isAuthenticated: !isEmpty(userData)
		});
	}

	const registerPage = () => {
		return (
			<Register setUser={setCurrentUser} />
		);
	}

	const loginPage = () => {
		return (
			<Login setUser={setCurrentUser} />
		);
	}

  return (
		<Router>
			<div className="App">
				<Navbar />
				<Route exact path="/" component={Landing} />
				<Route exact path="/register" render={registerPage} />
				<Route exact path="/login" render={loginPage} />
				<Route exact path="/dashboard" component={Dashboard} />
			</div>
		</Router>
  );
}

export default App;
