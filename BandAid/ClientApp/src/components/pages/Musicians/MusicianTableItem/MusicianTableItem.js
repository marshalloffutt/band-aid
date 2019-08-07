import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class MusicianTableItem extends Component {
  render() {
    const { musician, addBandMember } = this.props;

    const addBandMemberEvent = () => {
      const musicianId = musician.id;
      addBandMember(musicianId);
    };

    return (
      <tr>
        <td><Button color="danger" onClick={addBandMemberEvent}>Add</Button></td>
        <td>{musician.firstName} {musician.lastName}</td>
        <td>{musician.instrument}</td>
        <td>{musician.city}, {musician.state}</td>
      </tr>
    );
  }
}
