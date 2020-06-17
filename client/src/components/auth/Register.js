import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import isEmpty from "is-empty";
import { registerUser, loginUser } from "../../actions/authActions";
import { REQUEST_SUCCESS } from "../../actions/types";

function Register() {
  const [isLoggedin, setLoggedIn] = useState(false);
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const [error, setError] = useState({
		errorMessage: ""
	});

  const handleChange = async e => {
		const { name, value } = e.target;

    setNewUser(prevValue => {
			return {
				...prevValue,
				[name]: value
			}
		});
  };

  const handleSubmitClick = async e => {
    e.preventDefault();
    
		const requestResponse = await registerUser(newUser);

		if (requestResponse.authResponseType === REQUEST_SUCCESS) {
			const requestResponse = await loginUser(newUser);

			if (requestResponse.authResponseType === REQUEST_SUCCESS) {

        // If login is successful after registration, clear registration form
				setNewUser({
					name: "",
					email: "",
					password: "",
					password2: "",
				});
  
        // If login is successful after registration, clear old errors
				setError({
					errorMessage: ""
        });
        
        // Set user as logged in
        setLoggedIn(true);

			} else {
				setError({
					errorMessage: requestResponse.authResponsePayload
				});
			}
		} else {
			setError({
				errorMessage: requestResponse.authResponsePayload
			});
		}
	};
	
	return (
    isLoggedin ? <Redirect to="/dashboard" /> :
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form>
              <div className="input-field col s12">
                <input
                  onChange={handleChange}
                  value={newUser.name}
                  id="name"
                  name="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={handleChange}
                  value={newUser.email}
                  id="email"
                  name="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={handleChange}
                  value={newUser.password}
                  id="password"
                  name="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={handleChange}
                  value={newUser.password2}
                  id="password2"
                  name="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  onClick={handleSubmitClick}
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
                <div>
                  {(!isEmpty(error.errorMessage) && <strong class="error-text">{error.errorMessage}</strong>)}
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
	);
}

export default Register;