import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import FormSubmitMessage from '../layout/FormSubmitMessage';
import {resetPassword} from '../../actions/authActions';
import {REQUEST_SUCCESS, EMAIL_NOT_FOUND} from '../../actions/types';

import {
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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

function ResetPasswordForm() {
  const classes = useStyles();

  let token = useParams().token;

  const [user, setUser] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitted: false,
    submitMessage: '',
  });

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleClick = async (e) => {
    // Placeholder
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Card>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Reset Your Password
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={user.password}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={user.password2}
                  variant='outlined'
                  required
                  fullWidth
                  name='password2'
                  label='Confirm password'
                  type='password'
                  id='password2'
                  autoComplete='confirm-password'
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleClick}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit
            </Button>
            <Grid item xs={12}>
              {submitStatus.isSubmitted && (
                <FormSubmitMessage submitMessage={submitStatus.submitMessage} />
              )}
            </Grid>
          </form>
        </div>
      </Card>
    </Container>
  );
}

export default ResetPasswordForm;
