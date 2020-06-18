import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getUserData } from "../../actions/authActions";
import isEmpty from "is-empty";
import cookies from "js-cookie";

import DashboardNavbar from "./DashboardNavbar";
import DashboardBody from "./DashboardBody";

function Dashboard() {
  const token = cookies.get("user");

  const [isLoggedIn, setLoggedIn] = useState(!isEmpty(token));
  const [user, setUser] = useState({
    name: "",
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
	
	const handleLoggedIn = () => async stillLoggedIn => {
		if (stillLoggedIn) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}

	return (
		!isLoggedIn ? <Redirect to="/login" /> : 
		<div>
			<DashboardNavbar />
			<DashboardBody userData={user} changeLoggedIn={handleLoggedIn} />
		</div>
	);
}

export default Dashboard;