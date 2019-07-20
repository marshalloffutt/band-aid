import React, { Component } from 'react';
import moment from 'moment';

export default class UserShindigListItem extends Component {
  render() {
    const { shindig } = this.props;

    return (
      <p>{shindig.description} on {moment(shindig.eventdate).format('MMMM Do YYYY')}</p>
    );
  }
}
