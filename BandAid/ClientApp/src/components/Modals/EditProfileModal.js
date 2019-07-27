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

const defaultUser = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  dateCreated: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  instrument: '',
  yearsOfExp: '',
  imageUrl: '',
  bio: '',
  inactive: 0,
};

class EditProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newUser: defaultUser,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  formFieldNumberState = (name, e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value * 1;
    this.setState({ newUser: tempUser });
  }

  toggle() {
    const tempUser = this.props.currentUser;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newUser: tempUser,
    }));
  }


  firstnameChange = e => this.formFieldStringState('firstName', e);

  lastnameChange = e => this.formFieldStringState('lastName', e);

  phoneChange = e => this.formFieldNumberState('phone', e);

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipcodeChange = e => this.formFieldNumberState('zipcode', e);

  instrumentChange = e => this.formFieldStringState('instrument', e);

  yearsOfExpChange = e => this.formFieldNumberState('yearsOfExp', e);

  imageUrlChange = e => this.formFieldStringState('imageUrl', e);

  bioChange = e => this.formFieldStringState('bio', e);

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    const myUser = { ...this.state.newUser };
    const userId = this.props.currentUser.id;
    onSubmit(myUser, userId);
    this.setState({ newUser: defaultUser });
  }

  render() {
    const { newUser } = this.state;

    return (
      <div>
        <Button outline color="danger" className="m-2" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className='{this.props.className}'>
          <ModalHeader toggle={this.toggle}>Edit Account!</ModalHeader>
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
                            value={newUser.firstName}
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
                            value={newUser.lastName}
                            onChange={this.lastnameChange}
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
                            value={newUser.imageUrl}
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
                            value={newUser.phone}
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
                          value={newUser.address}
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
                            value={newUser.city}
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
                            value={newUser.state}
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
                              value={newUser.zipcode}
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
                              value={newUser.instrument}
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
                            value={newUser.yearsOfExp}
                            onChange={this.yearsOfExpChange}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="form-group">
                          <Label htmlFor="bio" className="control-label">Bio:</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="bio"
                              placeholder=""
                              value={newUser.bio}
                              onChange={this.bioChange}
                            />
                        </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}></Col>
                    <Col md={2}>
                      <FormGroup className="form-group">
                          <Button
                          onClick={(e) => {
                            this.toggle();
                            this.formSubmit();
                            e.preventDefault();
                          }}
                          color="danger"
                          outline
                          >Save</Button>
                      </FormGroup>
                    </Col>
                    <Col md={5}></Col>
                  </Row>
                </Form>
              </div>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

export default EditProfileModal;
