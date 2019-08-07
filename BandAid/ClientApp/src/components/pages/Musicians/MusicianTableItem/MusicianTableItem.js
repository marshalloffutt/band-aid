import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class MusicianTableItem extends Component {
  state = {
    addButtonDisabled: false,
  }

  render() {
    const { addButtonDisabled } = this.state;
    const { musician, addBandMember } = this.props;

    const addBandMemberEvent = () => {
      this.setState({ addButtonDisabled: true });
      const musicianId = musician.id;
      addBandMember(musicianId);
    };

    return (
      <tr>
        <td><Button color="danger" disabled={addButtonDisabled} onClick={addBandMemberEvent}>Add</Button> </td>
        <td>{musician.firstName} {musician.lastName}</td>
        <td>{musician.instrument}</td>
        <td>{musician.city}, {musician.state}</td>
      </tr>
    );
  }
}
