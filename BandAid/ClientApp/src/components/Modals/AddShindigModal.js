import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const defaultShindig = {
  description: '',
  eventDate: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  hasComeToPass: false,
  bandId: 0,
};

class AddShindigModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newShindig: defaultShindig,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempShindig = { ...this.state.newShindig };
    tempShindig[name] = e.target.value;
    this.setState({ newShindig: tempShindig });
  }

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    const tempShindig = { ...this.state.newShindig };
    tempShindig[name] = e.target.value * 1;
    this.setState({ newShindig: tempShindig });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      newShindig: defaultShindig,
    });
  }

  descriptionChange = e => this.formFieldStringState('description', e);

  handleEventDateChange = (date) => {
    const tempShindig = { ...this.state.newShindig };
    tempShindig.eventDate = new Date(date);
    this.setState({ newShindig: tempShindig });
  }

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipcodeChange = e => this.formFieldNumberState('zipcode', e)

  onSubmit = (e) => {
    const { shindigFormSubmit } = this.props;
    const shindig = { ...this.state.newShindig };
    shindig.bandId = this.props.bandId;
    shindig.closed = false;
    shindigFormSubmit(shindig);
    this.setState({ newShindig: defaultShindig });
  }

  render() {
    const { newShindig } = this.state;

    return (
      <div>
        <Button className="btn-danger mb-4" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="slate" toggle={this.toggle}>Create New Shindig:</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label className="slate" htmlFor="inputEventDate">Date:</Label>
              <DatePicker
                  selected={this.state.newShindig.eventDate}
                  onChange={this.handleEventDateChange}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="time"
              />
              {/* <Input
                  type="text"
                  className="form-control"
                  id="inputEventDate"
                  aria-describedby="eventDateHelp"
                  value={newShindig.eventDate}
                  onChange={this.eventDateChange}
                /> */}
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputDescription">Description:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  aria-describedby="descriptionHelp"
                  value={newShindig.description}
                  onChange={this.descriptionChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputAddress">Address:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  aria-describedby="addressHelp"
                  value={newShindig.address}
                  onChange={this.addressChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputCity">City:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  aria-describedby="cityHelp"
                  value={newShindig.city}
                  onChange={this.cityChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputState">State:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputState"
                  aria-describedby="stateHelp"
                  value={newShindig.state}
                  onChange={this.stateChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputZipcode">Zipcode:</Label>
              <Input
                  type="number"
                  className="form-control"
                  id="inputZipcode"
                  aria-describedby="zipcodeHelp"
                  value={newShindig.zipcode}
                  onChange={this.zipcodeChange}
                />
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
          <Button className="btn-danger" onClick={(e) => {
            this.toggle();
            this.onSubmit();
            e.preventDefault();
          }}>Save</Button>{' '}
            <Button className="btn-grey" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddShindigModal;
