import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Dashboard from "./components/layout/Dashboard"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
		<Router>
			<div className="App">
				<Route exact path="/" component={Landing} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
			</div>
		</Router>
  );
}

export default App;
