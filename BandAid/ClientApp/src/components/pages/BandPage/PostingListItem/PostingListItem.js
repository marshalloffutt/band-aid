import React, { Component } from 'react';
import { Button } from 'reactstrap';
import EditPostingModal from '../../../Modals/EditPostingModal';
import postingReplyRequests from '../../../../helpers/data/postingReplyRequests';
import ReplyListItem from '../ReplyListItem/ReplyListItem';
import roleTranslator from '../../../../helpers/roleTranslator';
import postingRequests from '../../../../helpers/data/postingRequests';

export default class PostingListItem extends Component {
  state = {
    posting: this.props.posting,
    postingId: this.props.posting.id,
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

  updatePosting = (postingToUpdate, postingId) => {
    postingRequests.updatePosting(postingToUpdate, postingId)
      .then((res) => {
        const updatedPosting = res.data;
        this.setState({ posting: updatedPosting });
      });
  };

  rejectReply = (replyId) => {
    postingReplyRequests.deletePostingReply(replyId)
      .then(() => {
        this.rosterCheck();
      });
  }

  render() {
    const { deletePosting, currentBand, acceptApplicant } = this.props;
    const { replies, posting } = this.state;

    const deleteEvent = () => {
      const postingId = posting.id;
      deletePosting(postingId);
    };

    const makeEditButtons = () => {
      if (this.state.userInBand) {
        return (
        <div className="d-flex justify-content-around">
          <EditPostingModal
            buttonLabel="Edit Posting"
            posting={posting}
            updatePosting={this.updatePosting}
          />
          <Button color="danger" className="mb-4" onClick={deleteEvent}>Delete Posting</Button>
        </div>
        );
      } return '';
    };

    const replyComponents = replies.map(reply => (
      <ReplyListItem
        reply={reply}
        key={reply.id}
        rejectReply={this.rejectReply}
        currentBand={currentBand}
        acceptApplicant={acceptApplicant}
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
              {makeEditButtons()}
          </div>
        </div>
      </div>
    );
  }
}
