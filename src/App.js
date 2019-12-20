import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import ContactForm from "../src/components/ContactForm";
Amplify.configure(aws_exports);

class App extends React.Component {
  render() {
    return <ContactForm />;
  }
}
const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  defaultCountryCode: "1",
  signUpFields: [
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "email"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password"
    }
  ]
};
const usernameAttributes = "Email";

const federated = {
  facebook_app_id: "2673870812649985"
};

export default withAuthenticator(App, {
  includeGreetings: true,
  federated: { federated },
  signUpConfig,
  usernameAttributes
});
