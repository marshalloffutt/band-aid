import React, { Component } from 'react';
import {
  Card,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import roleTranslator from '../../../../helpers/roleTranslator';

import './PostingItem.scss';

export default class PostingItem extends Component {
  render() {
    const { posting } = this.props;
    const id = posting.BandId;

    return (
      <Card className="posting-card mt-4">
        <div className="card-body" id={posting.Id}>
          <h3>{roleTranslator(posting.InstrumentRequested)}</h3>
          <Link className="card-title" to={{ pathname: `/bands/${id}`, state: { id } }}>{posting.Band}</Link>
          <hr></hr>
          <p className="card-text">{posting.Genre}</p>
          <p className="card-text">{posting.Description}</p>
          <Button className="btn-danger">Reply</Button>
        </div>
      </Card>
    );
  }
}
