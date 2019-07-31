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
  id: 0,
  description: '',
  eventDate: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  hasComeToPass: false,
  bandId: 0,
};

class EditShindigModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newShindig: defaultShindig,
      newDate: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      newDate: new Date(this.props.shindig.eventDate),
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      newDate: new Date(props.shindig.eventDate),
    });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempShindig = { ...this.state.newShindig };
    tempShindig[name] = e.target.value;
    this.setState({ newShindig: tempShindig });
  }

  formFieldNumberState = (name, e) => {
    const tempShindig = { ...this.state.newShindig };
    tempShindig[name] = e.target.value * 1;
    this.setState({ newShindig: tempShindig });
  }

  toggle() {
    const tempShindig = this.props.shindig;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newShindig: tempShindig,
    }));
  }

  descriptionChange = e => this.formFieldStringState('description', e);

  handleEventDateChange = (date) => {
    // const tempShindig = { ...this.state.newShindig };
    this.setState({ newDate: date });
    // tempShindig.eventDate = this.state.newDate;
    // tempShindig.eventDate = new Date(date);
    // this.setState({ newShindig: tempShindig });
  }

  addressChange = e => this.formFieldStringState('address', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipcodeChange = e => this.formFieldNumberState('zipcode', e)

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    const shindigToUpdate = { ...this.state.newShindig };
    shindigToUpdate.eventDate = this.state.newDate;
    const shindigId = this.props.shindig.id;
    onSubmit(shindigToUpdate, shindigId);
    this.setState({ newShindig: defaultShindig });
  }

  render() {
    const { newShindig } = this.state;

    return (
      <div>
        <button className="btn btn-default" onClick={this.toggle}>
              <i className="fas fa-pencil-alt icon"></i>
          </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="slate" toggle={this.toggle}>Edit Shindig:</ModalHeader>
          <ModalBody>
          <Form>
          <FormGroup>
              <Label className="slate" htmlFor="inputEventDate">Date:</Label>
              <DatePicker
                  selected={this.state.newDate}
                  onChange={this.handleEventDateChange}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="time"
              />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputDescription">Description:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputdescription"
                  aria-describedby="inputDescriptionHelp"
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
            this.formSubmit();
          }}>Save</Button>{' '}
            <Button className="btn-grey" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditShindigModal;
