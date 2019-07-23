import React, { Component } from 'react';
import {
  Card,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './PostingItem.scss';

export default class PostingItem extends Component {
  render() {
    const { posting } = this.props;
    const id = posting.BandId;

    return (
      <Card className="posting-card mt-4">
        <div className="card-body" id={posting.Id}>
          <Link className="card-title" to={{ pathname: `/bands/${id}`, state: { id } }}>{posting.Band}</Link>
          <hr></hr>
          <h5 className="card-subtitle">{posting.InstrumentRequested}</h5>
          <hr></hr>
          <p className="card-text">{posting.Genre}</p>
          <hr></hr>
          <p className="card-text">{posting.Description}</p>
          <Button className="btn-danger">Reply</Button>
        </div>
      </Card>
    );
  }
}
