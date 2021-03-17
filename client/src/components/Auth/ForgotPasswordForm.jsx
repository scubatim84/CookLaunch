import React, { useState } from 'react';
import {
  Button, Card, Container, Grid, TextField,
} from '@material-ui/core';

import FormSubmitMessage from '../FormSubmitMessage';
import { sendPasswordResetEmail } from '../../actions/authActions';
import useStylesMain from '../../Styles';
import { themeMain } from '../../Theme';
import CardTitle from '../CardTitle';

const ForgotPasswordForm = () => {
  const classes = useStylesMain(themeMain);

  const [forgotUser, setForgotUser] = useState({
    email: '',
  });
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitted: false,
    submitMessage: '',
  });

  const handleChange = (e) => {
    // If user starts changing email, reset submission status and message
    setSubmitStatus({
      isSubmitted: false,
      submitMessage: '',
    });

    const { name, value } = e.target;

    setForgotUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = forgotUser;

    const response = await sendPasswordResetEmail(email);

    if (response.status === 200) {
      setSubmitStatus({
        isSubmitted: true,
        submitMessage:
          'A link has been sent to that email to reset your password.',
      });
    } else if (response.status === 404) {
      setSubmitStatus({
        isSubmitted: true,
        submitMessage: 'This email address is not registered.',
      });
    } else {
      setSubmitStatus({
        isSubmitted: true,
        submitMessage: response,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <Grid className={classes.paper}>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} align="center">
                <CardTitle title="Retrieve Password" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={forgotUser.email}
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
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
};

export default ForgotPasswordForm;
