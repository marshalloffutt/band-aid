import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import MusicianTableItem from './MusicianTableItem/MusicianTableItem';

import bandMemberRequests from '../../../helpers/data/bandMemberRequests';
import userRequests from '../../../helpers/data/userRequests';

export default class Musicians extends Component {
  state = {
    musicians: [],
    currentUser: [],
    userBands: [],
    selectedBand: {},
  }

  componentDidMount() {
    userRequests.getUser()
      .then((currentUser) => {
        this.setState({ currentUser });
        this.setState({ userBands: currentUser.bands });
        if (currentUser.bands.count !== 0) {
          this.setState({ selectedBand: currentUser.bands[0] });
        }
      });
    userRequests.getAllUsers()
      .then((allMusicians) => {
        const musicians = allMusicians
          .filter(musician => musician.id !== this.state.currentUser.id);
        this.setState({ musicians });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addBandMember = (musicianId) => {
    const newBandMember = {};
    newBandMember.musicianId = musicianId;
    newBandMember.bandId = this.state.selectedBand.id;
    newBandMember.dateJoined = new Date();
    bandMemberRequests.createBandMember(newBandMember);
  }

  render() {
    const { musicians } = this.state;

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
