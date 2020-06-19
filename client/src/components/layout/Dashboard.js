import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import isEmpty from "is-empty";

import Typography from '@material-ui/core/Grid';

function Dashboard(props) {
  const [isLoggedIn, setLoggedIn] = useState(props.loggedIn);
  const [user, setUser] = useState(props.userData);
	
  useEffect(() => {
    setUser(props.userData)
	}, [props.userData]);

	useEffect(() => {
		setLoggedIn(props.loggedIn);
	}, [props.loggedIn]);
	
	return (
		!isLoggedIn ? <Redirect to="/login" /> : 
		<div>
			<Typography>
				Welcome {!isEmpty(user.firstName) && user.firstName}
			</Typography>
		</div>
	);
}

export default Dashboard;