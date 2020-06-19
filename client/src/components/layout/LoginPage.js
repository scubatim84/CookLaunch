import React from "react";
import Login from "../auth/Login";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function LoginPage() {
	const classes = useStyles();

	return (
    <div className="login-background background-image-full">
			<div className={classes.root}>
				<Grid
					container
					spacing={0}
					alignItems="center"
					justify="center"
					style={{ minHeight: "100vh" }}
				>
					<Grid className={classes.position} item xs={6}>
						<Login />
					</Grid>
				</Grid>
  	  </div>
    </div>
	);
}

export default LoginPage;