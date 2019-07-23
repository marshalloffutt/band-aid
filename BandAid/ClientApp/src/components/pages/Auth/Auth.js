import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Button,
  Jumbotron,
} from 'reactstrap';

import authRequests from '../../../helpers/data/authRequests';
import Register from '../../Register/Register';

import './Auth.scss';

class Auth extends React.Component {
    state = {
      user: {
        email: '',
        password: '',
      },
    };

    loginClickEvent = (e) => {
      const { user } = this.state;
      e.preventDefault();
      authRequests
        .loginUser(user)
        .then(() => {
          this.props.history.push('/home');
        })
        .catch((error) => {
          console.error('there was an error in registering', error);
        });
    };

    emailChange = (e) => {
      const tempUser = { ...this.state.user };
      tempUser.email = e.target.value;
      this.setState({ user: tempUser });
    };

    passwordChange = (e) => {
      const tempUser = { ...this.state.user };
      tempUser.password = e.target.value;
      this.setState({ user: tempUser });
    };

    render() {
      const { user } = this.state;
      return (
        <Jumbotron className="auth-jumbotron">
              <div id="login-form mt-5">
                <Row>
                    <Col>
                      <h1 className="title is-1 mt-5 red">Band<span className="gold">★</span>Aid </h1>
                    </Col>
                </Row>
                <Form className="mt-4">
                    <FormGroup className="form-group">
                      <div className="input-field">
                        <Input
                        type="email"
                        className="form-control input-password-email-field"
                        id="inputEmail"
                        placeholder="Email"
                        value={user.email}
                        onChange={this.emailChange}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group">
                    <div className="input-field">
                        <Input
                        type="password"
                        className="form-control input-password-email-field"
                        id="inputPassword"
                        placeholder="Password"
                        value={user.password}
                        onChange={this.passwordChange}
                        />
                   </div>
                    </FormGroup>
                    <FormGroup className="formButtons">
                    <div className="">
                        <Button
                          className="m-2 ba-btn-danger-outline"
                          color="danger"
                          outline
                          onClick={this.loginClickEvent}
                        >
                        Login
                        </Button>
                    </div>
                    <div className="">
                      <Register />
                    </div>
                    </FormGroup>
                </Form>
                </div>
                </Jumbotron>
      );
    }
}

export default Auth;
