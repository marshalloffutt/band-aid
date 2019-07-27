import React, { Component } from 'react';
import moment from 'moment';
import './ReplyListItem.scss';

export default class ReplyListItem extends Component {
  render() {
    const { reply } = this.props;
    return (
        <li className="card reply-item">
            <div className="card-body">
              <h5 className="card-title">{moment(reply.DateCreated).format('MMM Do YYYY')}</h5>
              <p className="card-text">{reply.firstname} {reply.lastname}: {reply.message}</p>
            </div>
        </li>
    );
  }
}
