import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import './ReplyListItem.scss';

export default class ReplyListItem extends Component {
  render() {
    const { reply } = this.props;
    const id = reply.UserId;

    return (
        <li className="card reply-item">
            <div className="card-body" id={reply.UserId}>
              <h5 className="card-title">{moment(reply.DateCreated).format('MMM Do YYYY')}</h5>
              <Link className="card-text" to={{ pathname: `/musicians/${reply.UserId}`, state: { id } }}>{reply.firstname} {reply.lastname}: </Link>
              <p className="card-text">{reply.message}</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-default">
                  <i className="fas fa-check confirm-icon fa-3x"></i>
                </button>
                <button className="btn btn-default">
                  <i className="fas fa-times reject-icon fa-3x"></i>
                </button>
              </div>
            </div>
        </li>
    );
  }
}
