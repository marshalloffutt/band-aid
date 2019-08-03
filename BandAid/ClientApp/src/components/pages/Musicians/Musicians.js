import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import MusicianTableItem from './MusicianTableItem/MusicianTableItem';
import userRequests from '../../../helpers/data/userRequests';

export default class Musicians extends Component {
  state = {
    musicians: [],
    currentUser: [],
    userBands: [],
    selectedBand: {},
  }

  componentDidMount() {
    userRequests.getAllUsers()
      .then((musicians) => {
        this.setState({ musicians });
        userRequests.getUser()
          .then((currentUser) => {
            this.setState({ currentUser });
            this.setState({ userBands: currentUser.bands });
            if (currentUser.bands.count !== 0) {
              this.setState({ selectedBand: currentUser.bands[0] });
            }
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { musicians } = this.state;

    const musicianComponents = musicians.map(musician => (
      <MusicianTableItem
        musician={musician}
        key={musician.id}
      />
    ));
    return (
      <div>
        <h1 className="title is-1 mt-5 red mb-4">Musicians</h1>
        <Container>
          <Table className="white">
            <thead>
              <tr>
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
