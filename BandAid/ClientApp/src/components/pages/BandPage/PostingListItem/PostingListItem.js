import React, { Component } from 'react';
import postingReplyRequests from '../../../../helpers/data/postingReplyRequests';
import roleTranslator from '../../../../helpers/roleTranslator';

export default class PostingListItem extends Component {
  state = {
    posting: this.props.posting,
    replies: [],
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

  render() {
    const { posting } = this.props;

    return (
      <div className="mb-3">
        <div className="card">
          <div className="card-header">
            <h3>NEEDED: {roleTranslator(posting.instrumentRequested)}</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">{posting.description}</h5>
            <p className="card-text">Replies will occupy this space</p>
          </div>
        </div>
      </div>
    );
  }
}
