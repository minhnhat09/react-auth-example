import * as React from "react";
import { Formik } from "formik";
import { LoginPage as TablerLoginPage } from "tabler-react";
import { connect } from "react-redux";

import { userActions } from "../_actions";

class LoginPageTabler extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log("handleSubmit", values);
    this.setState({ submitted: true });
    console.log(this.state);
    const username = values.email;
    const { password } = values;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const strings = {
      title: "Login to your Account",
      buttonText: "Login",
      emailLabel: "User name",
      emailPlaceholder: "Enter user name",
      passwordLabel: "Password",
      passwordPlaceholder: "Password"
    };
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={values => {
          // same as above, but feel free to move this into a class method now.
          let errors = {};
          if (!values.email) {
            errors.email = "Email Required";
          } /* else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } */
          if (!values.password) {
            errors.password = "Password Required";
          }
          return errors;
        }}
        onSubmit={(
          values,
          { setSubmitting, setErrors /* setValues and other goodies */ }
        ) => {
          this.handleSubmit(values);
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <TablerLoginPage
            strings={strings}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPageTabler);
export { connectedLoginPage as LoginPageTabler };
