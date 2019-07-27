import React, { Component } from 'react';
import {
  Col,
  Row,
  Jumbotron,
  Container,
  Table,
  Button,
} from 'reactstrap';

import MusicianListItem from './MusicianListItem/MusicianListItem';
import ShindigListItem from './ShindigListItem/ShindigListItem';
import PostingListItem from './PostingListItem/PostingListItem';

import bandRequests from '../../../helpers/data/bandRequests';

import './BandPage.scss';

export default class BandPage extends Component {
  state = {
    bandId: this.props.location.state.id,
    currentUser: this.props.currentUser,
    currentBand: {},
    musicians: [],
    shindigs: [],
    postings: [],
    userInTheBand: false,
  }

  componentDidMount() {
    bandRequests.getBand(this.state.bandId)
      .then((band) => {
        this.setState({ currentBand: band });
        this.setState({ musicians: band.musicians });
        this.setState({ shindigs: band.shindigs });
        this.setState({ postings: band.postings });
      })
      .then(() => {
        const userId = this.props.currentUser.id;
        const rosterArray = this.state.currentBand.musicians;
        rosterArray.forEach((musician) => {
          if (musician.id === userId) {
            this.setState({ userInTheBand: true });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    this.setState = {
      bandId: 0,
      currentBand: {},
      musicians: [],
      shindigs: [],
      postings: [],
    };
  }

  render() {
    const {
      currentBand,
      musicians,
      postings,
      shindigs,
      currentUser,
      userInTheBand,
      bandId,
    } = this.state;

    const musicianComponents = musicians.map(musician => (
      <MusicianListItem
        musician={musician}
        key={musician.id}
      />
    ));

    const postingComponents = postings.map(posting => (
      <PostingListItem
        posting={posting}
        key={posting.id}
        currentBand={currentBand}
        currentUser={currentUser}
      />
    ));

    const shindigComponents = shindigs.map(shindig => (
      <ShindigListItem
        shindig={shindig}
        key={shindig.id}
      />
    ));

    const makeAddPostingButton = () => {
      if (userInTheBand) {
        return (
          <Button outline color="danger" className="mb-4" bandId={bandId}>Create a Posting</Button>
        );
      } return '';
    };

    return (
      <div className="band-page">
        <Jumbotron className="band-jumbotron">
          <h1 className="is-1 mt-5">{currentBand.name}</h1>
          <h5>{currentBand.genre}</h5>
          <h5>{currentBand.city}, {currentBand.state}</h5>
        </Jumbotron>
        <Container>
          <Row>
            <Col md={6}>
              <h3 className="red">Bio</h3>
              <p className="white">{currentBand.description}</p>
            </Col>
            <Col md={6}>
              <h3 className="red">Roster</h3>
              {musicianComponents}
            </Col>
          </Row>
          <Row className="mb-4 mt-4">
            <Col md={6}>
            <h3 className="red">Upcoming Events</h3>
            <Table className="white">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
              {shindigComponents}
              </tbody>
            </Table>

            </Col>
            <Col md={6}>
              <h3 className="red">Postings</h3>
              {makeAddPostingButton()}
              {postingComponents}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
