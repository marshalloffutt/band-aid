import React, { Component } from 'react';

export default class MusicianTableItem extends Component {
  render() {
    const { musician } = this.props;
    return (
      <tr>
        <td>{musician.firstName} {musician.lastName}</td>
        <td>{musician.instrument}</td>
        <td>{musician.city}, {musician.state}</td>
      </tr>
    );
  }
}
