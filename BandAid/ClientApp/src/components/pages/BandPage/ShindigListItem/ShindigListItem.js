import React, { Component } from 'react';
import moment from 'moment';

import './ShindigListItem.scss';

export default class ShindigListItem extends Component {
  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteShindig, shindig } = this.props;
    const shindigId = shindig.id;
    deleteShindig(shindigId);
  }

  render() {
    const { shindig } = this.props;

    const makeButtons = () => {
      if (this.props.userInTheBand) {
        return (
          <td>
          <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt icon"></i>
          </button>
          <button className="btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt icon"></i>
          </button>
        </td>
        );
      } return '';
    };

    return (
          <tr>
            {makeButtons()}
            <th scope="row">{moment(shindig.eventDate).format('MMMM Do YYYY, h:mm:ss a')}</th>
            <td>{shindig.description}</td>
            <td>{shindig.address} <br/> {shindig.city}, {shindig.state}</td>
          </tr>
    );
  }
}
