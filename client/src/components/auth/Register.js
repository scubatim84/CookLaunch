import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
	const [registerUser, setRegisterUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {}
	});

  const onChange = e => {
		const { name, value } = e.target;

    setRegisterUser(prevValue => {
			return {
				...prevValue,
				[name]: value
			}
		});
  };

  const onSubmit = e => {
    e.preventDefault();
    
    const newUser = {
      name: registerUser.name,
      email: registerUser.email,
      password: registerUser.password,
      password2: registerUser.password2
		};

	};
	
	const { errors } = registerUser;

	return (
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
					<form noValidate onSubmit={onSubmit}>
						<div className="input-field col s12">
							<input
								onChange={onChange}
								value={registerUser.name}
								error={errors.name}
								name="name"
								type="text"
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="input-field col s12">
							<input
								onChange={onChange}
								value={registerUser.email}
								error={errors.email}
								name="email"
								type="email"
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="input-field col s12">
							<input
								onChange={onChange}
								value={registerUser.password}
								error={errors.password}
								name="password"
								type="password"
							/>
							<label htmlFor="password">Password</label>
						</div>
						<div className="input-field col s12">
							<input
								onChange={onChange}
								value={registerUser.password2}
								error={errors.password2}
								name="password2"
								type="password"
							/>
							<label htmlFor="password2">Confirm Password</label>
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
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;