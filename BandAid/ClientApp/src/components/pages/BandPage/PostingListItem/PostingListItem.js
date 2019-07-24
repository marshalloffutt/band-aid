import React, { Component } from 'react';
import roleTranslator from '../../../../helpers/roleTranslator';

export default class PostingListItem extends Component {
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
