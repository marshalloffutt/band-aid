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

const defaultReply = {
  dateCreated: '',
  postingId: '',
  musicianId: '',
  message: '',
  closed: false,
};

class AddPostingReplyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newReply: defaultReply,
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempReply = { ...this.state.newReply };
    tempReply[name] = e.target.value;
    this.setState({ newReply: tempReply });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      newReply: defaultReply,
    });
  }

  messageChange = e => this.formFieldStringState('message', e);

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    const reply = { ...this.state.reply };
    reply.dateCreated = new Date();
    reply.bandId = 1;
    onSubmit(reply);
    this.setState({ newReply: defaultReply });
  }

  render() {
    const { newReply } = this.state;
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
                  value={newReply.message}
                  onChange={this.messageChange}
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

export default AddPostingReplyModal;
