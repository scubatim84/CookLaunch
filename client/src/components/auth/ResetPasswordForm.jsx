import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  checkResetPasswordToken,
  validatePassword,
  resetPasswordByEmail,
} from '../../actions/authActions';
import isEmpty from 'is-empty';

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
import {makeStyles} from '@material-ui/core/styles';
import {REQUEST_SUCCESS} from '../../actions/types';

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

  const token = useParams().token;

  const [user, setUser] = useState({
    password: '',
    password2: '',
  });
  const [error, setError] = useState({
    errorMessage: '',
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

  const handleClick = async () => {
    const passwordCheck = await validatePassword(user.password, user.password2);

    if (passwordCheck.isValid) {
      const tokenResponse = await checkResetPasswordToken(token);

      if (tokenResponse.authResponseType === REQUEST_SUCCESS) {
        const userEmail = tokenResponse.authResponsePayload.email;
        const userPassword = user.password;

        const changeResponse = await resetPasswordByEmail(
          userEmail,
          userPassword
        );

        console.log(changeResponse);

        /* Placeholder, once password is validated, need to add PUT/PATCH to change
				password for user in DB. Once that is done, and verified, add code to
				redirect user to dashboard. Response should include email, so for PUT/PATCH,
				send user email and password as parameters. This way the same function can
				be used for regular password changes inside user profile. */

        // If password reset is successful, clear password reset form
        setUser({
          password: '',
          password2: '',
        });

        // If password reset is successful, clear old errors from state
        setError({
          errorMessage: '',
        });
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
              fullWidth
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

export default ResetPasswordForm;
