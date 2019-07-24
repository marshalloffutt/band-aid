import React, { Component } from 'react';
import './MusicianListItem.scss';

export default class MusicianListItem extends Component {
  render() {
    const { musician } = this.props;

    return (
      <div className="d-flex justify-content-center mb-2">
        <img className="bandPhotoIcon" src={musician.imageUrl} alt={musician.firstName}/>
        <p className="white ml-3">{musician.firstName} {musician.lastName}<span className="gold mr-2 ml-2">★</span></p>
        <p className="white">{musician.instrument}</p>
      </div>
    );
  }
}
