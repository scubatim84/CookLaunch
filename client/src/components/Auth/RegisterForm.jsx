import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import isEmpty from 'is-empty';
import FormSubmitMessage from '../FormSubmitMessage';
import {registerUser, loginUser} from '../../actions/authActions';
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

function RegisterForm(props) {
  const classes = useStylesMain(themeMain);

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

  const handleChange = (e) => {
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

    if (registerResponse.status === 201) {
      const loginResponse = await loginUser(newUser);

      if (loginResponse.status === 200) {
        // If login is successful after registration, set user as logged in
        props.handleLoggedIn(true);
      } else {
        setError({
          errorMessage: loginResponse.data,
        });
      }
    } else {
      setError({
        errorMessage: registerResponse.data,
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
                  <CardTitle title='Start The Oven' />
                </Grid>
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
                <Grid item xs={12} className={classes.buttonMargin}>
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems='flex-start'
                justify='flex-end'
                direction='row'
              >
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
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

export default RegisterForm;
