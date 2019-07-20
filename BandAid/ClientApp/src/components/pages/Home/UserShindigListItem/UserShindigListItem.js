import React, { Component } from 'react';

export default class UserShindigListItem extends Component {
  render() {
    const { shindig } = this.props;

    return (
      <p>{shindig.description} on {shindig.eventdate}</p>
    );
  }
}
