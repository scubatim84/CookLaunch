import React from "react";
import RegisterForm from "../auth/RegisterForm";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  position: {
		padding: '125px 0px 100px 20px',
		marginLeft: '0px'
  },
}));

function LandingBody() {
	const classes = useStyles();

	return (
    <div className="landing-background background-image-full">
			<div className={classes.root}>
				<Grid className={classes.position} item xs={4}>
					<RegisterForm />
				</Grid>
  	  </div>
    </div>
  );
}

export default LandingBody;