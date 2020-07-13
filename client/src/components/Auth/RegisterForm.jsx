import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {registerUser, loginUser} from '../../actions/authActions';
import {REQUEST_SUCCESS} from '../../actions/types';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {
  Button,
  Card,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';

function RegisterForm(props) {
  const classes = useStylesForm(themeMain);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setNewUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerResponse = await registerUser(newUser);

    if (registerResponse.authResponseType === REQUEST_SUCCESS) {
      const loginResponse = await loginUser(newUser);

      if (loginResponse.authResponseType === REQUEST_SUCCESS) {
        // If login is successful after registration, set user as logged in
        props.handleLoggedIn(true);
      } else {
        setError({
          errorMessage: loginResponse.authResponsePayload,
        });
      }
    } else {
      setError({
        errorMessage: registerResponse.authResponsePayload,
      });
    }
  };

  return props.isLoggedIn ? (
    <Redirect to='/dashboard' />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Card>
        <Grid className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Start The Oven
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  value={newUser.firstName}
                  variant='outlined'
                  required
                  fullWidth
                  label='First Name'
                  name='firstName'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  value={newUser.lastName}
                  variant='outlined'
                  required
                  fullWidth
                  label='Last Name'
                  name='lastName'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={newUser.email}
                  variant='outlined'
                  required
                  fullWidth
                  label='Email Address'
                  type='email'
                  name='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={newUser.password}
                  variant='outlined'
                  required
                  fullWidth
                  label='Password'
                  type='password'
                  name='password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={newUser.password2}
                  variant='outlined'
                  required
                  fullWidth
                  label='Confirm password'
                  type='password'
                  name='password2'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
            <Grid container justify='flex-end' className={classes.form}>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
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
}

export default RegisterForm;
