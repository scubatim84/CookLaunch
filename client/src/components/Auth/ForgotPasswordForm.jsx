import React, {useState} from 'react';
import FormSubmitMessage from '../FormSubmitMessage';
import {sendPasswordResetEmail} from '../../actions/authActions';
import {REQUEST_SUCCESS, EMAIL_NOT_FOUND} from '../../actions/types';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';
import {Button, Card, Container, Grid, TextField} from '@material-ui/core';
import CardTitle from '../CardTitle';

function ForgotPasswordForm() {
  const classes = useStylesForm(themeMain);

  const [forgotUser, setForgotUser] = useState({
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

    setForgotUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = forgotUser.email;

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
        <Grid className={classes.paper}>
          <CardTitle title='Retrieve Password' />
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={forgotUser.email}
                  variant='outlined'
                  required
                  fullWidth
                  label='Email Address'
                  name='email'
                  type='email'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                {submitStatus.isSubmitted && (
                  <FormSubmitMessage
                    submitMessage={submitStatus.submitMessage}
                  />
                )}
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Card>
    </Container>
  );
}

export default ForgotPasswordForm;
