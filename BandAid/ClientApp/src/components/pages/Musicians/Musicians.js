import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import MusicianTableItem from './MusicianTableItem/MusicianTableItem';

import bandMemberRequests from '../../../helpers/data/bandMemberRequests';
import userRequests from '../../../helpers/data/userRequests';

import './Musicians.scss';

export default class Musicians extends Component {
  state = {
    musicians: [],
    currentUser: [],
    currentBand: this.props.location.state.band.currentBand,
  }

  componentDidMount() {
    userRequests.getUser()
      .then((currentUser) => {
        this.setState({ currentUser });
      });
    userRequests.getAllUsers()
      .then((registeredMusicians) => {
        const bandMusicians = [...this.state.currentBand.musicians];

        // filter musicians where we cannot find matching id's
        const musicians = registeredMusicians
          .filter(musician => !bandMusicians
            .find(bandMusician => bandMusician.id === musician.id));
        this.setState({ musicians });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addBandMember = (musicianId) => {
    const newBandMember = {};
    newBandMember.musicianId = musicianId;
    newBandMember.bandId = this.state.currentBand.id;
    newBandMember.dateJoined = new Date();
    bandMemberRequests.createBandMember(newBandMember);
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
