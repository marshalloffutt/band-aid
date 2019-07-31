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
  name: '',
  genre: '',
  description: '',
  logoUrl: '',
  dateCreated: '',
  inactive: false,
  city: '',
  state: '',
};

class AddBandModal extends React.Component {
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
    this.setState({
      modal: !this.state.modal,
      newBand: defaultBand,
    });
  }

  nameChange = e => this.formFieldStringState('name', e);

  genreChange = e => this.formFieldStringState('genre', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  logoUrlChange = e => this.formFieldStringState('logoUrl', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    const band = { ...this.state.newBand };
    band.dateCreated = new Date();
    onSubmit(band);
    this.setState({ newBand: defaultBand });
  }

  render() {
    const { newBand } = this.state;

    return (
      <div>
        <Button className="btn-danger mb-4" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="slate" toggle={this.toggle}>Create New Band:</ModalHeader>
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
                  aria-describedby="genreHelp"
                  value={newBand.genre}
                  onChange={this.genreChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputDescription">Bio:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  aria-describedby="descriptionHelp"
                  value={newBand.description}
                  onChange={this.descriptionChange}
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
            this.formSubmit();
            e.preventDefault();
          }}>Save</Button>{' '}
            <Button className="btn-grey" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddBandModal;
