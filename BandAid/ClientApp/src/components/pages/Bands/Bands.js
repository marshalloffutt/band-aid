import React, { Component } from 'react';
import BandListItem from './BandListItem/BandListItem';
import bandRequests from '../../../helpers/data/bandRequests';

export default class Bands extends Component {
  state = {
    bands: [],
    currentUser: this.props.currentUser,
  }

  componentDidMount() {
    bandRequests.getAll()
      .then((bands) => {
        this.setState({ bands });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    this.setState = {
      bands: [],
    };
  }


  render() {
    const { bands } = this.state;

    const bandComponents = bands.map(band => (
      <BandListItem
        band={band}
        key={band.id}
      />
    ));

    return (
      <div>
        <h1 className="title is-1 mt-5 red mb-4">Bands</h1>
        <div className="d-flex flex-wrap justify-content-around">
          {bandComponents}
        </div>
      </div>
    );
  }
}
