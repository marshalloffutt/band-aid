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

const defaultPosting = {
  id: 0,
  instrumentRequested: '',
  description: '',
  closed: false,
  bandId: 0,
};

class EditPostingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newPosting: defaultPosting,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempPosting = { ...this.state.newPosting };
    tempPosting[name] = e.target.value;
    this.setState({ newPosting: tempPosting });
  }

  toggle() {
    const tempPosting = this.props.posting;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newPosting: tempPosting,
    }));
  }

  instrumentRequestedChange = e => this.formFieldStringState('instrumentRequested', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  formSubmitEvent = (e) => {
    const { updatePosting } = this.props;
    const postingToUpdate = { ...this.state.newPosting };
    const postingId = this.props.posting.id;
    updatePosting(postingToUpdate, postingId);
    this.setState({ newPosting: defaultPosting });
  }

  render() {
    const { newPosting } = this.state;

    return (
      <div>
        <Button color="danger" className="mb-4" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="slate" toggle={this.toggle}>Edit Posting:</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label className="slate" htmlFor="inputInstrumentRequested">Instrument Requested:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputInstrumentRequested"
                  aria-describedby="instrumentRequestedHelp"
                  value={newPosting.instrumentRequested}
                  onChange={this.instrumentRequestedChange}
                />
            </FormGroup>
            <FormGroup>
              <Label className="slate" htmlFor="inputDescription">Description:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputdescription"
                  aria-describedby="inputDescriptionHelp"
                  value={newPosting.description}
                  onChange={this.descriptionChange}
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

export default EditPostingModal;
