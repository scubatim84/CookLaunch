import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {loginUser} from '../../actions/authActions';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {
  Button,
  Card,
  Container,
  Grid,
  Link,
  TextField,
} from '@material-ui/core';
import CardTitle from '../CardTitle';

function LoginForm(props) {
  const classes = useStylesForm(themeMain);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleChange = async (e) => {
    const {name, value} = e.target;

    setLogin((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await loginUser(login);

    if (loginResponse.status === 200) {
      // If login request is successful, set user as logged in
      props.handleLoggedIn(true);
    } else {
      setError({
        errorMessage: loginResponse.data,
      });
    }
  };

  return props.isLoggedIn ? (
    <Redirect to='/dashboard' />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Card>
        <Grid className={classes.paper}>
          <CardTitle title='Sign In Here' />
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={login.email}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={login.password}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='password'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Login
                </Button>
              </Grid>
            </Grid>
            <Grid container justify='space-between' className={classes.form}>
              <Grid item>
                <Link href='/forgotpassword' variant='body2'>
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/' variant='body2'>
                  Don't have an account? Register
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

export default LoginForm;
