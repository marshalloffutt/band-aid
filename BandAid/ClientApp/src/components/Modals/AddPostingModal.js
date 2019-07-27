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
  instrumentRequested: '',
  description: '',
  closed: false,
  bandId: 0,
};

class AddPostingModal extends React.Component {
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
    this.setState({
      modal: !this.state.modal,
      newPosting: defaultPosting,
    });
  }

  instrumentRequestedChange = e => this.formFieldStringState('instrumentRequested', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  onSubmit = (e) => {
    const { formSubmit } = this.props;
    const posting = { ...this.state.newPosting };
    posting.dateCreated = new Date();
    posting.musicianId = this.props.musicianId;
    posting.bandId = this.props.bandId;
    posting.postingId = this.props.postingId;
    posting.closed = false;
    formSubmit(posting);
    this.setState({ newPosting: defaultPosting });
  }

  render() {
    const { newPosting } = this.state;

    return (
      <div>
        <Button className="btn-danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="slate" toggle={this.toggle}>Reply:</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label className="slate" htmlFor="inputMessage">Message:</Label>
              <Input
                  type="text"
                  className="form-control"
                  id="inputMessage"
                  aria-describedby="messageHelp"
                  value={newPosting.message}
                  onChange={this.messageChange}
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

export default AddPostingModal;
