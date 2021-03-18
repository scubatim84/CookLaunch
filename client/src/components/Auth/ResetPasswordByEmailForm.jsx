import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import isEmpty from 'is-empty';
import {
  Button, Card, Container, Grid, TextField,
} from '@material-ui/core';
import {
  checkResetPasswordToken,
  loginUser,
  validatePassword,
  resetPassword,
} from '../../actions/authActions';

import FormSubmitMessage from '../FormSubmitMessage';
import useStylesMain from '../../Styles';
import { themeMain } from '../../Theme';
import CardTitle from '../CardTitle';

const ResetPasswordByEmailForm = (props) => {
  const classes = useStylesMain(themeMain);

  const { token } = useParams();

  const [password, setPassword] = useState({
    password: '',
    password2: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPassword((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordCheck = await validatePassword(
      password.password,
      password.password2,
    );

    if (passwordCheck.isValid) {
      const tokenResponse = await checkResetPasswordToken(token);

      if (tokenResponse.status === 200) {
        const userData = {
          email: tokenResponse.data,
          password: password.password,
        };

        const changeResponse = await resetPassword(userData);

        if (changeResponse.status === 204) {
          const loginResponse = await loginUser(userData);

          if (loginResponse.status === 200) {
            // If password reset and login are successful, set user as logged in
            props.handleLoggedIn(true);
          } else {
            setError({
              errorMessage: changeResponse,
            });
          }
        } else {
          setError({
            errorMessage: changeResponse,
          });
        }
      } else {
        setError({
          errorMessage: tokenResponse,
        });
      }
    } else {
      setError({
        errorMessage: passwordCheck.error,
      });
    }
  };

  if (props.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <Grid className={classes.paper}>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} align="center">
                <CardTitle title="Reset Your Password" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={password.password}
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={password.password2}
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirm password"
                  type="password"
                  name="password2"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttonMargin}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {!isEmpty(error.errorMessage) && (
                <FormSubmitMessage submitMessage={error.errorMessage} />
              )}
            </Grid>
          </form>
        </Grid>
      </Card>
    </Container>
  );
};

export default ResetPasswordByEmailForm;
