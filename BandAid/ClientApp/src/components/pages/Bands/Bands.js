import React, { Component } from 'react';
import bandRequests from '../../../helpers/data/bandRequests';
import './Bands.scss';

export default class Bands extends Component {
  state = {
    bands: [],
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


  render() {
    return (
      <div>
        <h1>Bands</h1>
      </div>
    );
  }
}
