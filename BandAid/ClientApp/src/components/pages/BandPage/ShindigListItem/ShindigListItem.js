import React, { Component } from 'react';
import moment from 'moment';

export default class ShindigListItem extends Component {
  render() {
    const { shindig } = this.props;

    return (
          <tr>
            <th scope="row">{moment(shindig.eventDate).format('MMMM Do YYYY, h:mm:ss a')}</th>
            <td>{shindig.description}</td>
            <td>{shindig.address} <br/> {shindig.city}, {shindig.state}</td>
          </tr>
    );
  }
}
