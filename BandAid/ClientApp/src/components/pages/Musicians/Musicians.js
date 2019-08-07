import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import MusicianTableItem from './MusicianTableItem/MusicianTableItem';

import bandMemberRequests from '../../../helpers/data/bandMemberRequests';
import userRequests from '../../../helpers/data/userRequests';

import './Musicians.scss';
import bandRequests from '../../../helpers/data/bandRequests';

export default class Musicians extends Component {
  state = {
    musicians: [],
    currentUser: [],
    bandId: this.props.location.state.band.currentBand.id,
    currentBand: [],
  }

  getAvailableMusicians = () => {
    userRequests.getAllUsers()
      .then((registeredMusicians) => {
        const bandMusicians = [...this.state.currentBand.musicians];

        // filter musicians where we cannot find matching id's
        const musicians = registeredMusicians
          .filter(musician => !bandMusicians
            .find(bandMusician => bandMusician.id === musician.id));
        this.setState({ musicians });
      });
  }

  getCurrentBand = (bandId) => {
    bandRequests.getBand(this.state.currentBand.id)
      .then((band) => {
        this.setState({ currentBand: band });
      });
  }

  componentDidMount() {
    userRequests.getUser()
      .then((currentUser) => {
        this.setState({ currentUser });
        bandRequests.getBand(this.state.bandId)
          .then((band) => {
            this.setState({ currentBand: band }, this.getAvailableMusicians);
          });
      });
  }

  addBandMember = (musicianId) => {
    const newBandMember = {};
    const bandId = this.state.currentBand.id;
    newBandMember.musicianId = musicianId;
    newBandMember.bandId = bandId;
    newBandMember.dateJoined = new Date();
    bandMemberRequests.createBandMember(newBandMember)
      .then(() => this.getCurrentBand(bandId))
      .then(this.getAvailableMusicians);
  }

  render() {
    const { musicians, currentBand } = this.state;

    const musicianComponents = musicians.map(musician => (
      <MusicianTableItem
        musician={musician}
        key={musician.id}
        addBandMember={this.addBandMember}
      />
    ));
    return (
      <div>
        <h1 className="title is-1 mt-5 red mb-4">Musicians</h1>
        <Container>
          <Container className="mb-4">
          <img
            id={currentBand.id}
            className="band-logo-card-sm"
            src={currentBand.logoUrl}
            alt={currentBand.name}
          />
          </Container>
          <Table className="white">
            <thead>
              <tr>
                <th>Add:</th>
                <th>Name</th>
                <th>Instrument</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
            {musicianComponents}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
