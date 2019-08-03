import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import './ReplyListItem.scss';

export default class ReplyListItem extends Component {
  render() {
    const {
      reply,
      rejectReply,
      currentBand,
      acceptApplicant,
    } = this.props;

    const id = reply.UserId;

    const deleteReplyEvent = (e) => {
      e.preventDefault();
      const replyId = this.props.reply.id;
      rejectReply(replyId);
    };

    const addBandMemberEvent = (e) => {
      e.preventDefault();
      const newBandMember = {};
      newBandMember.musicianId = reply.UserId;
      newBandMember.bandId = currentBand.id;
      newBandMember.dateJoined = new Date();
      const postingId = reply.PostingId;
      acceptApplicant(newBandMember, postingId);
    };

    return (
        <li className="card reply-item">
            <div className="card-body" id={reply.UserId}>
              <h5 className="card-title">{moment(reply.DateCreated).format('MMM Do YYYY')}</h5>
              <Link className="card-text" to={{ pathname: `/musicians/${reply.UserId}`, state: { id } }}>{reply.firstname} {reply.lastname}: </Link>
              <p className="card-text">{reply.message}</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-default" onClick={addBandMemberEvent}>
                  <i className="fas fa-check confirm-icon fa-3x"></i>
                </button>
                <button className="btn btn-default" onClick={deleteReplyEvent}>
                  <i className="fas fa-times reject-icon fa-3x"></i>
                </button>
              </div>
            </div>
        </li>
    );
  }
}
