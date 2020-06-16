import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import cookies from "js-cookie";
import isEmpty from "is-empty";

import Landing from "../layout/Landing";

function Dashboard() {
	const history = useHistory();
	const userCookie = cookies.get("user");
	const userAuthenticated = !isEmpty(userCookie);

	const [user, setUser] = useState({
		user: {}
	});

	if (userAuthenticated) {
		setUser(userCookie);
	}	 else {
		history.push("/");
	}

  const onLogoutClick = e => {
		e.preventDefault();

		logoutUser();
	};
	
	return (
		<div style={{ height: "75vh" }} className="container valign-wrapper">
			<div className="row">
				<div className="col s12 center-align">
					<h4>
						<b>Hey there,</b>
						<p className="flow-text grey-text text-darken-1">
							You are logged into a full-stack{" "}
							<span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
						</p>
					</h4>
					<button
						style={{
							width: "150px",
							borderRadius: "3px",
							letterSpacing: "1.5px",
							marginTop: "1rem"
						}}
						onClick={onLogoutClick}
						className="btn btn-large waves-effect waves-light hoverable blue accent-3"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;