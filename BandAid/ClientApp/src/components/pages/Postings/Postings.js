import React, { Component } from 'react';
import SearchField from 'react-search-field';
import {
  Container,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from 'reactstrap';
import PostingItem from './PostingItem/PostingItem';

import postingRequests from '../../../helpers/data/postingRequests';
import postingReplyRequests from '../../../helpers/data/postingReplyRequests';
import userRequests from '../../../helpers/data/userRequests';

import './Postings.scss';

export default class Postings extends Component {
  state = {
    allPostings: [],
    postings: [],
    filteredPostings: [],
    currentUser: {},
  }

  componentDidMount() {
    postingRequests.getAll()
      .then((postings) => {
        this.setState({ postings });
        this.setState({ allPostings: postings });
        userRequests.getUser()
          .then((currentUser) => {
            this.setState({ currentUser });
          });
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

  formSubmitEvent = (reply) => {
    postingReplyRequests.createPostingReply(reply)
      .then(() => {
        postingRequests.getAll()
          .then((postings) => {
            this.setState({ postings });
            this.setState({ allPostings: postings });
            userRequests.getUser()
              .then((currentUser) => {
                this.setState({ currentUser });
              });
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  buttonFilter = (e) => {
    const { allPostings } = this.state;
    const filteredPostings = [];
    e.preventDefault();
    allPostings.forEach((result) => {
      if (result.Genre.toLowerCase() === e.target.id) {
        filteredPostings.push(result);
      }
      this.setState({ postings: filteredPostings });
    });
  }

  showAll = (e) => {
    const { allPostings } = this.state;
    this.setState({ postings: allPostings });
  }

  render() {
    const { postings, currentUser } = this.state;

    const postingsItemComponents = postings.map(posting => (
      <PostingItem
        posting={posting}
        key={posting.Id}
        musicianId={currentUser.id}
        formSubmit={this.formSubmitEvent}
        />
    ));

    return (
      <div>
        <h1 className="title is-1 mt-5 red mb-4">Postings</h1>
        <SearchField
              placeholder="Search Postings..."
              onChange={this.onChange}
              searchText=""
              classNames="searchBar"
            />
            <Container className="d-flex justify-content-center mt-4">
              <ButtonToolbar>
                <ButtonGroup>
                  <Button id="all" className="genre-button" onClick={this.showAll}>Show All</Button>
                  <Button id="rock" className="genre-button" onClick={this.buttonFilter}>Rock</Button>
                  <Button id="country" className="genre-button" onClick={this.buttonFilter}>Country</Button>
                  <Button id="pop" className="genre-button" onClick={this.buttonFilter}>Pop</Button>
                  <Button id="metal" className="genre-button" onClick={this.buttonFilter}>Metal</Button>
                  <Button id="punk" className="genre-button" onClick={this.buttonFilter}>Punk</Button>
                  <Button id="jazz" className="genre-button" onClick={this.buttonFilter}>Jazz</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Container>
        <Container className="mt-5 postings">
          <div className="card-deck">
            {postingsItemComponents}
          </div>
        </Container>
      </div>
    );
  }
}
