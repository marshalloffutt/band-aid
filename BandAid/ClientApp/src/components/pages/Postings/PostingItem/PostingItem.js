import React, { Component } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import './PostingItem.scss';

export default class PostingItem extends Component {
  render() {
    const { posting } = this.props;

    return (
      <Card>
        <CardBody>
          <CardTitle>{posting.Band}</CardTitle>
          <CardSubtitle>{posting.InstrumentRequested}</CardSubtitle>
          <CardText>{posting.Description}</CardText>
          <Button className="red-button">Reply</Button>
        </CardBody>
      </Card>
    );
  }
}
