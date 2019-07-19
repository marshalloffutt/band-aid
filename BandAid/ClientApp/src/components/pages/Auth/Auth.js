import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Container,
} from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import Register from '../../Register/Register';

import photo from '../../../images/band-image.png';
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
            <Container className="Login">
                <div>
                  <img className='bandImg' src={ photo } alt='logo'/>
                </div>
                <div id="login-form mt-5">
                <Row>
                    <Col><h2 className="text-center">Login to Band★Aid</h2></Col>
                </Row>
                <Form>
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
                        type="submit"
                        className="btn col-xs-12 mr-2 blue-button"
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
            </Container>
      );
    }
}

export default Auth;
