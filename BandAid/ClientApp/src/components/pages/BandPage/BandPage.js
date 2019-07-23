import React, { Component } from 'react';

import bandRequests from '../../../helpers/data/bandRequests';

export default class BandPage extends Component {
  state = {
    bandId: this.props.location.state.id,
    currentBand: {},
  }

  componentDidMount() {
    bandRequests.getBand(this.state.bandId)
      .then((band) => {
        this.setState({ currentBand: band });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { currentBand } = this.state;
    return (
      <div>
        <h1 className="title is-1 mt-5 red">{currentBand.name}</h1>
      </div>
    );
  }
}
