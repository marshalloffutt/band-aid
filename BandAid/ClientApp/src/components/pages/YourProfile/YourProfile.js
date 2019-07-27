import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';
import EditProfileModal from '../../Modals/EditProfileModal';

import './YourProfile.scss';

export default class YourProfile extends Component {
  state = {
    userId: 0,
    currentUser: this.props.currentUser,
  }

  componentDidMount() {
    this.setState({ userId: this.state.currentUser.id });
  }

  getCurrentUser = (userId) => {
    userRequests.getUser()
      .then((currentUser) => {
        this.setState({ currentUser });
      }).catch((error) => {
        console.error(error);
      });
  }

  formSubmitEvent = (newUser, userId) => {
    userRequests.updateUser(newUser, userId)
      .then(() => {
        this.getCurrentUser(this.state.userId);
      });
  }

  deactivateUserEvent = (e) => {
    const user = this.state.currentUser;
    const userId = user.id;
    userRequests.deactivateUser(user, userId)
      .then(() => {
        authRequests.logoutUser();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
    <Container>
      <h1 className="title is-1 mt-5 red">Your<span className="gold ml-2 mr-2">★</span>Profile </h1>
      <Container className="mt-4 user-card">
        <Row>
          <Col md={4}>
            <Row>
              <img className="user-photo" src={currentUser.imageUrl} alt="yourUglyMug" />
            </Row>
            <Row className="mt-4">
              <EditProfileModal
                buttonLabel="Edit Profile"
                currentUser={currentUser}
                onSubmit={this.formSubmitEvent}
              />
            </Row>
            <Row>
              <Button outline color="danger" onClick={this.deactivateUserEvent}>Deactivate Account</Button>
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
            <Row className="mt-4">
              <Col>
                <h4 className="text-left">Bio:</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-left"> {currentUser.bio}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      </Container>
    );
  }
}
