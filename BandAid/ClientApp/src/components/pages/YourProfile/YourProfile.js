import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

import './YourProfile.scss';

export default class YourProfile extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Container>
        <h1>Your Profile</h1>
        <Row>
          <Col md={4}>
            <img className="user-photo" src={currentUser.imageUrl} alt="yourUglyMug" />
          </Col>
          <Col md={8}>
            <div className="d-flex flex-row">
              <h5>Name:</h5>
              <p className="ml-3">{currentUser.firstName} {currentUser.lastName}</p>
              <Button>Edit</Button>
            </div>
            <div className="d-flex flex-row">
              <h5>Address:</h5>
              <p className="ml-3">{currentUser.address} <br/>{currentUser.city}, {currentUser.state} {currentUser.zipcode}</p>
              <Button>Edit</Button>
            </div>
            <div className="d-flex flex-row">
              <h5>Instrument:</h5>
              <p className="ml-3">{currentUser.instrument} for {currentUser} years</p>
              <Button>Edit</Button>
            </div>
          </Col>
        </Row>

      </Container>

    );
  }
}
