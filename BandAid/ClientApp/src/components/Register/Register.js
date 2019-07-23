/* eslint-disable no-shadow */
import React from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import authRequests from '../../helpers/data/authRequests';
import userRequests from '../../helpers/data/userRequests';

import './Register.scss';

const tempUser = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  instrument: '',
  yearsOfExp: '',
  imageUrl: '',
  inactive: 0,
  dateCreated: '',
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: tempUser,
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    const currentDate = new Date();
    tempUser.dateCreated = currentDate;
    this.setState({ user: tempUser });
  }

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .registerUser(user)
      .then(() => {
        authRequests.getCurrentUserJwt();
        userRequests.createUser(user);
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.user };
    tempUser[name] = e.target.value;
    this.setState({ user: tempUser });
  }

  formFieldNumberState = (name, e) => {
    const tempUser = { ...this.state.user };
    tempUser[name] = e.target.value * 1;
    this.setState({ user: tempUser });
  }

  firstnameChange = e => this.formFieldStringState('firstname', e);

  lastnameChange = e => this.formFieldStringState('lastname', e);

  emailChange = e => this.formFieldStringState('email', e);

  usernameChange = e => this.formFieldStringState('username', e);

  passwordChange = e => this.formFieldStringState('password', e);

  phoneChange = e => this.formFieldNumberState('phone', e);

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipcodeChange = e => this.formFieldNumberState('zipcode', e);

  instrumentChange = e => this.formFieldStringState('instrument', e);

  yearsOfExpChange = e => this.formFieldNumberState('yearsOfExp', e);

  imageUrlChange = e => this.formFieldStringState('imageUrl', e);

  render() {
    const { user } = this.state;
    const buildModal = () => (
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className='{this.props.className}'>
          <ModalHeader toggle={this.toggle}>Register a new Account!</ModalHeader>
          <ModalBody>
            <div className="Register">
              <Form id="login-form">
                <Row form>
                  <Col md={6}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputFirstname" className="control-label">First Name:</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputFirstname"
                          placeholder=""
                          value={user.firstname}
                          onChange={this.firstnameChange}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputLastname" className="control-label">Last Name:</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputLastname"
                          placeholder=""
                          value={user.lastname}
                          onChange={this.lastnameChange}
                        />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputEmail" className="control-label">Email:</Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="inputEmail"
                          placeholder=""
                          value={user.email}
                          onChange={this.emailChange}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputPassword" className="control-label">Password:</Label>
                        <Input
                          type="password"
                          className="form-control"
                          id="inputPassword"
                          placeholder=""
                          value={user.password}
                          onChange={this.passwordChange}
                        />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputImageUrl" className="control-label">Photo URL:</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputImageUrl"
                          placeholder=""
                          value={user.imageUrl}
                          onChange={this.imageUrlChange}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputPhone">Phone:</Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="inputPhone"
                          placeholder=""
                          value={user.phone}
                          onChange={this.phoneChange}
                        />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                  <FormGroup className="form-group">
                    <Label htmlFor="inputAddress" className="control-label">Address:</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        value={user.address}
                        onChange={this.addressChange}
                      />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputCity" className="control-label">City:</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputCity"
                          placeholder=""
                          value={user.city}
                          onChange={this.cityChange}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputState" className="control-label">State:</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputState"
                          placeholder=""
                          value={user.state}
                          onChange={this.stateChange}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup className="form-group">
                        <Label htmlFor="inputZipcode" className="control-label">Zipcode:</Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="inputZipcode"
                            placeholder=""
                            value={user.zipcode}
                            onChange={this.zipcodeChange}
                          />
                      </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className="form-group">
                        <Label htmlFor="inputInstrument" className="control-label">Instrument:</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="inputInstrument"
                            placeholder=""
                            value={user.instrument}
                            onChange={this.instrumentChange}
                          />
                      </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="form-group">
                      <Label htmlFor="inputYearsOfExp" className="control-label">Years of Experience:</Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="inputYearsOfExp"
                          placeholder=""
                          value={user.yearsOfExp}
                          onChange={this.yearsOfExpChange}
                        />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={5}></Col>
                  <Col md={2}>
                    <FormGroup className="form-group">
                        <Button
                          type="submit"
                          className="btn btn-danger"
                          onClick={this.registerClickEvent}
                        >
                          Register
                        </Button>
                    </FormGroup>
                  </Col>
                  <Col md={5}></Col>
                </Row>
              </Form>
            </div>
          </ModalBody>
        </Modal>
    );
    return (
        <div className="register">
        <div className='account'>
        <Button
            outline
            color="danger"
            className="m-2"
            onClick={this.toggle}>Register
          </Button>

        </div>
      <div>{buildModal()}</div>
      </div>
    );
  }
}
export default Register;
