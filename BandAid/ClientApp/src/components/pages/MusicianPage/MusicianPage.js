import React, { Component } from 'react';
import {
  Col,
  Row,
  Jumbotron,
  Container,
  Table,
} from 'reactstrap';

import userRequests from '../../../helpers/data/userRequests';

export default class MusicianPage extends Component {
  state = {
    musicianId: this.props.location.state.id,
    musician: [],
  }

  componentDidMount() {
    userRequests.getUserById(this.state.musicianId)
      .then((musician) => {
        this.setState({ musician });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>MusicianPage</h1>
      </div>
    );
  }
}
