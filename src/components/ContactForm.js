import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import axios from "axios";

const onSubmit = async values => {
  window.alert("Email has been sent!");
  console.log("Name " + values.name);
  console.log("Email " + values.email);
  console.log("Message " + values.message);

  const headers = {
    "Content-Type": "application/json"
  };

  axios
    .post(
      `https://k4e9ip245a.execute-api.us-west-2.amazonaws.com/test`,
      values,
      headers
    )
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.message) {
    errors.message = "Required";
  }
  return errors;
};

export default class ContactForm extends Component {
  render() {
    return (
      <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Contact Form
        </Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          validate={validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form
              onSubmit={event => {
                handleSubmit(event).then(() => {
                  form.reset();
                });
              }}
            >
              <Paper style={{ padding: 16 }}>
                <Grid
                  container
                  alignItems="flex-start"
                  spacing={2}
                  justify="center"
                >
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="name"
                      component={TextField}
                      type="text"
                      label="Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      fullWidth
                      required
                      component={TextField}
                      type="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="message"
                      component={TextField}
                      multiline
                      label="Message"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Send Email
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    );
  }
}
