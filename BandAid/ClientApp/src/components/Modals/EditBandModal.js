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

const defaultBand = {
  id: 0,
  name: '',
  genre: '',
  description: '',
  logoUrl: '',
  dateCreated: '',
  inactive: false,
  city: '',
  state: '',
};

class EditBandModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newBand: defaultBand,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempBand = { ...this.state.newBand };
    tempBand[name] = e.target.value;
    this.setState({ newBand: tempBand });
  }

  toggle() {
    const tempBand = this.props.band;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newBand: tempBand,
    }));
  }

  nameChange = e => this.formFieldStringState('description', e);

  genreChange = e => this.formFieldStringState('description', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  logoUrlChange = e => this.formFieldStringState('description', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  formSubmitEvent = (e) => {
    const { updateBand } = this.props;
    const bandToUpdate = { ...this.state.newBand };
    const bandId = this.props.band.id;
    updateBand(bandToUpdate, bandId);
    this.setState({ newBand: defaultBand });
  }

  render() {
    const { newBand } = this.state;

    return (
      <div>
        <Button className="secondary mb-4" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="slate" toggle={this.toggle}>Edit Band:</ModalHeader>
          <ModalBody>
          <Form>
          <FormGroup>
              <Label className="slate" htmlFor="inputName">Band Name:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputName"
                  aria-describedby="nameHelp"
                  value={newBand.name}
                  onChange={this.nameChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputGenre">Genre:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputGenre"
                  aria-describedby="agenreHelp"
                  value={newBand.genre}
                  onChange={this.genreChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputLogoUrly">URL for Band Logo:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputLogoUrl"
                  aria-describedby="logoUrlHelp"
                  value={newBand.logoUrl}
                  onChange={this.logoUrlChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputCity">City:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  aria-describedby="cityHelp"
                  value={newBand.city}
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
                  value={newBand.state}
                  onChange={this.stateChange}
                />
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
          <Button className="btn-danger" onClick={(e) => {
            this.toggle();
            this.formSubmitEvent();
            e.preventDefault();
          }}>Save</Button>{' '}
            <Button className="btn-grey" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditBandModal;
