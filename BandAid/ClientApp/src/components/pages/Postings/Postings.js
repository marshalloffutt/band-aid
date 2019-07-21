import React, { Component } from 'react';
import SearchField from 'react-search-field';
import { Container } from 'reactstrap';
import PostingItem from './PostingItem/PostingItem';

import postingRequests from '../../../helpers/data/postingRequests';

import './Postings.scss';

export default class Postings extends Component {
  state = {
    postings: [],
  }

  componentDidMount() {
    postingRequests.getAll()
      .then((postings) => {
        this.setState({ postings });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { postings } = this.state;

    const postingsItemComponents = postings.map(posting => (
      <PostingItem
        posting={posting}
        key={posting.id}
        />
    ));

    return (
      <div>
        <h1>Postings</h1>
        <SearchField
              placeholder="Search Postings..."
              onChange={this.onChange}
              searchText=""
              classNames="searchBar"
            />
        <Container>
        <div class="card-deck">
          {postingsItemComponents}
        </div>
        </Container>
      </div>
    );
  }
}
