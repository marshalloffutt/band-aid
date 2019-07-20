import React, { Component } from 'react';

export default class UserBandListItem extends Component {
  render() {
    const { band } = this.props;

    return (
      <p>{band.name} ★ {band.description}</p>
    );
  }
}
