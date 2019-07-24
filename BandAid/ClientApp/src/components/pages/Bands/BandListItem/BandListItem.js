import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BandListItem.scss';

export default class BandListItem extends Component {
  render() {
    const { band } = this.props;
    return (
      <div className="m-4">
        <Link to={{ pathname: `/bands/${band.id}`, state: { id: `${band.id}` } }}>
          <img
            id={band.id}
            class="band-logo-card"
            src={band.logoUrl}
            alt={band.name}
          />
        </Link>
      </div>
    );
  }
}
