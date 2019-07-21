import React, { Component } from 'react';
import {
  Card,
  Button,
} from 'reactstrap';
import './PostingItem.scss';

export default class PostingItem extends Component {
  render() {
    const { posting } = this.props;

    return (
      <Card className="posting-card">
        <div className="card-body" id={posting.Id}>
          <h4 className="card-title">{posting.Band}</h4>
          <hr></hr>
          <h5 className="card-subtitle">{posting.InstrumentRequested}</h5>
          <hr></hr>
          <p className="card-text">{posting.Genre}</p>
          <hr></hr>
          <p className="card-text">{posting.Description}</p>
          <Button className="red-button">Reply</Button>
        </div>
      </Card>
    );
  }
}
