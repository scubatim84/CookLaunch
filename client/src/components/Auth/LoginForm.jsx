import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {loginUser} from '../../actions/authActions';
import {useStylesMain} from '../../Styles';
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
  const classes = useStylesMain(themeMain);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
  });

  const handleChange = (e) => {
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

  if (props.isLoggedIn) {
    return <Redirect to='/dashboard' />;
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <Card>
          <Grid className={classes.paper}>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} align='center'>
                  <CardTitle title='Sign In Here' />
                </Grid>
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
                    className={classes.buttonMargin}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Grid container justify='space-between'>
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
}

export default LoginForm;
