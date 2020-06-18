import React from "react";
import Register from "../auth/Register";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  position: {
		padding: '125px 0px 100px 20px',
		marginLeft: '0px'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function LandingBody() {
	const classes = useStyles();

	return (
    <div className="landing-background">
			<div className={classes.root}>
				<Grid className={classes.position} item xs={4}>
					<Register className="register-card" />
				</Grid>
  	  </div>
    </div>
  );
}

export default LandingBody;