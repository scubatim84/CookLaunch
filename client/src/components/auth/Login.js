import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
	const [registerUser, setRegisterUser] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		errorMessage: ""
	});

	const onChange = e => {
    setRegisterUser({ [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: registerUser.email,
      password: registerUser.password
    };
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
					<form noValidate onSubmit={this.onSubmit}>
						<div className="input-field col s12">
							<input
								onChange={this.onChange}
								value={this.state.email}
								id="email"
								name="email"
								type="email"
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="input-field col s12">
							<input
								onChange={this.onChange}
								value={this.state.password}
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