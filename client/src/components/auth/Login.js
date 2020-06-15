import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

function Login() {
	const [loginUser, setLoginUser] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		errorMessage: ""
	});

	const onChange = e => {
		const { name, value } = e.target;

    setLoginUser(prevValue => {
			return {
				...prevValue,
				[name]: value
			}
		});
  };

  const onSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: loginUser.email,
      password: loginUser.password
		};
		
		axios
			.post("/api/users/login", userData)
			.then(res => {
				// Save to localStorage
	
				// Set token to localStorage
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user payload
				const payload = jwt_decode(token);
				// Set current user
			})
			.catch(err => {
				console.log(err);
			});
	};
	
	return (
		<div className="container">
			<div style={{ marginTop: "4rem" }} className="row">
				<div className="col s8 offset-s2">
					<Link to="/" className="btn-flat waves-effect">
						<i className="material-icons left">keyboard_backspace</i> Back to
						home
					</Link>
					<div className="col s12" style={{ paddingLeft: "11.250px" }}>
						<h4>
							<b>Login</b> below
						</h4>
						<p className="grey-text text-darken-1">
							Don't have an account? <Link to="/register">Register</Link>
						</p>
					</div>
					<form noValidate onSubmit={onSubmit}>
						<div className="input-field col s12">
							<input
								onChange={onChange}
								value={loginUser.email}
								id="email"
								name="email"
								type="email"
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="input-field col s12">
							<input
								onChange={onChange}
								value={loginUser.password}
								id="password"
								name="password"
								type="password"
							/>
							<label htmlFor="password">Password</label>
						</div>
						<div className="col s12" style={{ paddingLeft: "11.250px" }}>
							<button
								style={{
									width: "150px",
									borderRadius: "3px",
									letterSpacing: "1.5px",
									marginTop: "1rem"
								}}
								type="submit"
								className="btn btn-large waves-effect waves-light hoverable blue accent-3"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;