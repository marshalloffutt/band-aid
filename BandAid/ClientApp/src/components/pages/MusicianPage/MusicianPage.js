import React, { Component } from 'react';
import {
  Col,
  Row,
  Jumbotron,
  Container,
  Table,
} from 'reactstrap';

import userRequests from '../../../helpers/data/userRequests';

import './MusicianPage.scss';

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
    const { musician } = this.state;

    return (
      <div className="musician-page">
        <Jumbotron className="musician-jumbotron">
          <Row>
          <Col md={6}>
            <img className="musician-photo" src={musician.imageUrl} alt={musician.firstName} />
          </Col>
          <Col md={4}>
            <h1 className="is-1 mt-5">{musician.firstName}<span className="gold ml-2 mr-2">★</span>{musician.lastName}</h1>
            <h5>{musician.instrument}</h5>
            <h5>{musician.yearsOfExp} Years of Experience</h5>
            <h5>{musician.city}, {musician.state}</h5>
          </Col>
          </Row>
        </Jumbotron>
        <div className="bio">
          <Container>
            <h4 className="gold">Bio</h4>
            <p className="white">{musician.bio}</p>
          </Container>
        </div>
      </div>
    );
  }
}
