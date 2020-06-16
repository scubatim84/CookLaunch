import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getUserData, logoutUser } from "../../actions/authActions";
import { REQUEST_SUCCESS } from "../../actions/types";
import isEmpty from "is-empty";
import cookies from "js-cookie";

function Dashboard() {
  const token = cookies.get("user");

  const [isLoggedin, setLoggedIn] = useState(!isEmpty(token));
  const [user, setUser] = useState({
    name: "",
	});
	
  useEffect(() => {
    if (isLoggedin) {
      const getUserPayload = async () => {
        const data = await getUserData(token);
        const userPayload = await data.payload;

        setUser({
          name: userPayload.name
        });
      }

      getUserPayload();
    }
  }, [isLoggedin, token]);

  const handleLogoutClick = async () => {
    const response = await logoutUser();

    if (response === REQUEST_SUCCESS) {
      setLoggedIn(false);
    }
	};
	
	return (
    !isLoggedin ? <Redirect to="/" /> : 
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hello {!isEmpty(user.name) && user.name}</b>
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
              onClick={handleLogoutClick}
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