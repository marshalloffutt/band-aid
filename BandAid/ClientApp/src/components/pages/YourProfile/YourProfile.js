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
      <h1 className="title is-1 mt-5 red">Your<span className="gold">★</span>Profile </h1>
      <Container className="mt-4 user-card">
        <Row>
          <Col md={4}>
            <Row>
              <img className="user-photo" src={currentUser.imageUrl} alt="yourUglyMug" />
            </Row>
            <Row className="mt-4">
              <Button>Edit Profile</Button>
            </Row>
          </Col>
          <Col md={5}>
            <Row>
              <Col>
                <h3 className="text-left"> {currentUser.firstName} {currentUser.lastName}</h3>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
              <h4 className="text-left">Contact Information:</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-left">Email: </p>
              </Col>
              <Col>
                <p className="text-left"> {currentUser.email}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-left">Phone: </p>
              </Col>
              <Col>
                <p className="text-left"> {currentUser.phone}</p>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <h4 className="text-left">Location:</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-left"> {currentUser.city}, {currentUser.state}</p>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <h4 className="text-left">Additional Information:</h4>
              </Col>
            </Row>

            <Row>
              <Col>
                <p className="text-left">Instrument: </p>
              </Col>
              <Col>
                <p className="text-left"> {currentUser.instrument}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-left">Years of Experience: </p>
              </Col>
              <Col>
                <p className="text-left"> {currentUser.yearsOfExp}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      </Container>
    );
  }
}
