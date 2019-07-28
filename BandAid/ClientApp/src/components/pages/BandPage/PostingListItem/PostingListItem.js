import React, { Component } from 'react';
import { Button } from 'reactstrap';
import postingReplyRequests from '../../../../helpers/data/postingReplyRequests';
import ReplyListItem from '../ReplyListItem/ReplyListItem';
import roleTranslator from '../../../../helpers/roleTranslator';

export default class PostingListItem extends Component {
  state = {
    posting: this.props.posting,
    replies: [],
    userInBand: false,
  }

  rosterCheck = () => {
    const postingId = this.state.posting.id;
    const userId = this.props.currentUser.id;
    const rosterArray = this.props.currentBand.musicians;
    rosterArray.forEach((musician) => {
      if (musician.id === userId) {
        postingReplyRequests.getRepliesOnPosting(postingId)
          .then((replies) => {
            this.setState({ replies });
            this.setState({ userInBand: true });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  componentDidMount() {
    this.rosterCheck();
  }

  makeEditButton = () => {
    if (this.state.userInBand) {
      return <Button>Edit</Button>;
    } return '';
  }

  render() {
    const { posting } = this.props;
    const { replies } = this.state;

    const replyComponents = replies.map(reply => (
      <ReplyListItem
        reply={reply}
        key={reply.id}
      />
    ));

    return (
      <div className="mb-3">
        <div className="card">
          <div className="card-header">
            <h3>WANTED:</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">{roleTranslator(posting.instrumentRequested)}</h5>
            <p className="card-text">{posting.description}</p>
            <ul>
              {replyComponents}
            </ul>
            {this.makeEditButton()}
          </div>
        </div>
      </div>
    );
  }
}
