/* eslint-disable no-shadow */
import React from 'react';
import {
  Button,
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
  address: '',
  city: '',
  state: '',
  instrument: '',
  yearsOfExp: '',
  imageUrl: '',
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
    this.setState({ user: tempUser });
  }

  registerClickEvent = (e) => {
    const { user } = this.state;
    const currentDate = new Date();
    user.DateCreated = currentDate;
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

  instrumentChange = e => this.formFieldStringState('instrument', e);

  yearsOfExpChange = e => this.formFieldNumberState('yearsOfExp', e);

  imageUrlChange = e => this.formFieldStringState('imageUrl', e);

  render() {
    const { user } = this.state;
    const buildModal = () => (
        <Modal id='border-radius-1' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Register a new Account!</ModalHeader>
        <ModalBody>
        <div className="Register">
        <Form id="login-form">

            <FormGroup className="form-group">
              <Label htmlFor="inputFirstname" className="col-sm-5 control-label">
              </Label>
                <Input
                  type="firstname"
                  className="form-control"
                  id="inputFirstname"
                  placeholder="Firstname"
                  value={user.firstname}
                  onChange={this.firstnameChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputLastname" className="col-sm-5 control-label">
              </Label>
                <Input
                  type="lastname"
                  className="form-control"
                  id="inputLastname"
                  placeholder="Lastname"
                  value={user.lastname}
                  onChange={this.lastnameChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputEmail" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputPassword" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
            </FormGroup>


            <FormGroup className="form-group">
              <Label htmlFor="inputImageUrl" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="imageUrl"
                  className="form-control"
                  id="inputImageUrl"
                  placeholder="Photo url"
                  value={user.imageUrl}
                  onChange={this.imageUrlChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputPhone" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="phone"
                  className="form-control"
                  id="inputPhone"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={this.phoneChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputAddress" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="address"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Address"
                  value={user.address}
                  onChange={this.addressChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputCity" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="city"
                  className="form-control"
                  id="inputCity"
                  placeholder="City"
                  value={user.city}
                  onChange={this.cityChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputState" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="state"
                  className="form-control"
                  id="inputState"
                  placeholder="State"
                  value={user.state}
                  onChange={this.stateChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputInstrument" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="instrument"
                  className="form-control"
                  id="inputInstrument"
                  placeholder="Instrument"
                  value={user.instrument}
                  onChange={this.instrumentChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
              <Label htmlFor="inputYearsOfExp" className="col-sm-4 control-label">
              </Label>
                <Input
                  type="yearsOfExp"
                  className="form-control"
                  id="inputYearsOfExp"
                  placeholder="Years of Experience"
                  value={user.yearsOfExp}
                  onChange={this.yearsOfExpChange}
                />
            </FormGroup>

            <FormGroup className="form-group">
                <Button
                  type="submit"
                  className="btn btn-default col-xs-12 teal-button"
                  onClick={this.registerClickEvent}
                >
                  Register
                </Button>
            </FormGroup>

        </Form>
      </div>
        </ModalBody>
        </Modal>
    );
    return (
        <div className="register">
        <div className='account'>
          <Button className='btn red-button' onClick={this.toggle}>Register</Button>
        </div>
      <div>{buildModal()}</div>
      </div>
    );
  }
}
export default Register;
