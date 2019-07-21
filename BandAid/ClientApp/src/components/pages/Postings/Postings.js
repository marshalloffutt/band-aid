import React, { Component } from 'react';
import SearchField from 'react-search-field';
import { Container } from 'reactstrap';
import PostingItem from './PostingItem/PostingItem';

import postingRequests from '../../../helpers/data/postingRequests';

import './Postings.scss';

export default class Postings extends Component {
  state = {
    allPostings: [],
    postings: [],
    filteredPostings: [],
  }

  componentDidMount() {
    postingRequests.getAll()
      .then((postings) => {
        this.setState({ postings });
        this.setState({ allPostings: postings });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChange = (value, e) => {
    const { allPostings } = this.state;
    const filteredPostings = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredPostings: allPostings });
      this.setState({ postings: allPostings });
    } else {
      this.setState({ filteredPostings: [] });
      allPostings.forEach((result) => {
        if (result.Band.toLowerCase().includes(value.toLowerCase())
        || result.Description.toLowerCase().includes(value.toLowerCase())
        || result.InstrumentRequested.toLowerCase().includes(value.toLowerCase())) {
          filteredPostings.push(result);
        }
        this.setState({ postings: filteredPostings });
        if (!value) {
          this.setState({ postings: allPostings });
        }
      });
    }
  }

  render() {
    const { postings } = this.state;

    const postingsItemComponents = postings.map(posting => (
      <PostingItem
        posting={posting}
        key={posting.Id}
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
        <Container className="mt-5">
          <div className="card-deck">
            {postingsItemComponents}
          </div>
        </Container>
      </div>
    );
  }
}
