import React, {useState} from 'react';
import FormSubmitMessage from '../layout/FormSubmitMessage';
import {sendPasswordResetEmail} from '../../actions/authActions';
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

function ForgotPasswordForm() {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: '',
  });
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitted: false,
    submitMessage: '',
  });

  const handleChange = async (e) => {
    // If user starts changing email, reset submission status and message
    setSubmitStatus({
      isSubmitted: false,
      submitMessage: '',
    });

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

    const email = user.email;

    const requestResponse = await sendPasswordResetEmail(email);

    if (requestResponse.authResponseType === REQUEST_SUCCESS) {
      setSubmitStatus({
        isSubmitted: true,
        submitMessage:
          'A link has been sent to that email to reset your password.',
      });
    } else if (requestResponse.authResponsePayload === EMAIL_NOT_FOUND) {
      setSubmitStatus({
        isSubmitted: true,
        submitMessage: 'This email address is not registered.',
      });
    } else {
      setSubmitStatus({
        isSubmitted: true,
        submitMessage: requestResponse.authResponsePayload,
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Card>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Retrieve Password
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={user.email}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
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

export default ForgotPasswordForm;