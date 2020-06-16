import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmpty from "is-empty";
import { loginUser } from "../../actions/authActions";
import { REQUEST_SUCCESS } from "../../actions/types";

function Login(props) {
	const history = useHistory();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		errorMessage: ""
	});

	const handleRedirect = () => {
		history.push("/dashboard");
	}

	const handleChange = e => {
		const { name, value } = e.target;

    setUser(prevValue => {
			return {
				...prevValue,
				[name]: value
			}
		});
  };

  const handleClick = async e => {
    e.preventDefault();
    
    const userData = {
      email: user.email,
      password: user.password
		};
		
		const requestResponse = await loginUser(userData);

		if (requestResponse.authResponseType === REQUEST_SUCCESS) {

			props.setUser(user);

			setUser({
				email: "",
				password: "",
			});

			setError({
				errorMessage: ""
			});
		} else {
			setError({
				errorMessage: requestResponse.authResponsePayload
			});
		}

		handleRedirect();
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
					<form>
						<div className="input-field col s12">
							<input
								onChange={handleChange}
								value={user.email}
								id="email"
								name="email"
								type="email"
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="input-field col s12">
							<input
								onChange={handleChange}
								value={user.password}
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
								onClick={handleClick}
								type="submit"
								className="btn btn-large waves-effect waves-light hoverable blue accent-3"
							>
								Login
							</button>
							<div>
								{(!isEmpty(error.errorMessage) && <strong className="error">{error.errorMessage}</strong>)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;