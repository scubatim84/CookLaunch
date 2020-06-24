import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {
  checkResetPasswordToken,
  loginUser,
  validatePassword,
  resetPassword,
} from '../../actions/authActions';
import isEmpty from 'is-empty';
import {REQUEST_SUCCESS} from '../../actions/types';
import {useStylesForm} from '../../Styles';

import FormSubmitMessage from '../layout/FormSubmitMessage';

import {
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

function ResetPasswordByEmailForm(props) {
  const classes = useStylesForm();

  const token = useParams().token;

  const [user, setUser] = useState({
    password: '',
    password2: '',
  });
  const [isLoggedin, setLoggedIn] = useState(props.isLoggedIn);
  const [error, setError] = useState({
    errorMessage: '',
  });

  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordCheck = await validatePassword(user.password, user.password2);

    if (passwordCheck.isValid) {
      const tokenResponse = await checkResetPasswordToken(token);

      if (tokenResponse.authResponseType === REQUEST_SUCCESS) {
        const userData = {
          email: tokenResponse.authResponsePayload.email,
          password: user.password,
        };

        const changeResponse = await resetPassword(userData);

        if (changeResponse.authResponseType === REQUEST_SUCCESS) {
          const loginResponse = await loginUser(userData);

          if (loginResponse.authResponseType === REQUEST_SUCCESS) {
            // Set user as logged in
            props.handleLoggedIn(true);

            // If password reset and login are successful, clear password reset form
            setUser({
              email: '',
              password: '',
              password2: '',
            });

            // If password reset and login are successful, clear old errors from state
            setError({
              errorMessage: '',
            });
          } else {
            setError({
              errorMessage: changeResponse.authResponsePayload,
            });
          }
        } else {
          setError({
            errorMessage: changeResponse.authResponsePayload,
          });
        }
      } else {
        setError({
          errorMessage: tokenResponse.authResponsePayload,
        });
      }
    } else {
      setError({
        errorMessage: passwordCheck.error,
      });
    }
  };

  return isLoggedin ? (
    <Redirect to='/dashboard' />
  ) : (
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
              onClick={handleSubmit}
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit
            </Button>
            <Grid item xs={12}>
              {!isEmpty(error.errorMessage) && (
                <FormSubmitMessage submitMessage={error.errorMessage} />
              )}
            </Grid>
          </form>
        </div>
      </Card>
    </Container>
  );
}

export default ResetPasswordByEmailForm;
