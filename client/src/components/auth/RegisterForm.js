import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { registerUser, loginUser } from "../../actions/authActions";
import isEmpty from "is-empty";
import { REQUEST_SUCCESS } from "../../actions/types";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
	},
}));

function RegisterForm(props) {
	const classes = useStyles();

  const [isLoggedin, setLoggedIn] = useState(props.isLoggedin);
	const [newUser, setNewUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		password2: "",
	});
	const [error, setError] = useState({
		errorMessage: ""
  });
  
  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
	}, [props.isLoggedIn]);

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
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					password2: "",
				});
  
        // If login is successful after registration, clear old errors
				setError({
					errorMessage: ""
        });
        
        // Set user as logged in
        props.handleLoggedIn(true);

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
		
		<Container component="main" maxWidth="xs">
			<Card>
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Start The Oven
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={handleChange}
									value={newUser.firstName}
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									autoComplete="fname"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={handleChange}
									value={newUser.lastName}
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={handleChange}
									value={newUser.email}
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={handleChange}
									value={newUser.password}
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={handleChange}
									value={newUser.password2}
									variant="outlined"
									required
									fullWidth
									name="password2"
									label="Confirm password"
									type="password"
									id="password2"
									autoComplete="confirm-password"
								/>
							</Grid>
						</Grid>
						<Button
							onClick={handleSubmitClick}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
						<div>
							{(!isEmpty(error.errorMessage) && <strong class="error-text">{error.errorMessage}</strong>)}
						</div>
					</form>
				</div>
   		</Card>
		</Container>
	);
}

export default RegisterForm;