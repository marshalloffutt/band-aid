import React from 'react';
import {
  Row,
  Col,
  Jumbotron,
  Container,
} from 'reactstrap';

import UserBandListItem from './UserBandListItem/UserBandListItem';
import UserShindigListItem from './UserShindigListItem/UserShindigListItem';

import userRequests from '../../../helpers/data/userRequests';
import shindigRequests from '../../../helpers/data/shindigRequests';

import './Home.scss';

class Home extends React.Component {
  state = {
    userId: 0,
    user: {},
    userBands: [],
    userShindigs: [],
  }

  goToPostings = () => {
    this.props.history.push('/postings');
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        userRequests.getUserById(userId)
          .then((user) => {
            this.setState({ user });
            const userBands = this.state.user.bands;
            this.setState({ userBands });
            shindigRequests.getShindigsUserById(userId)
              .then((userShindigs) => {
                this.setState({ userShindigs });
              });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    this.setState = {
      userId: 0,
      user: {},
      userBands: [],
      userShindigs: [],
    };
  }

  render() {
    const { user, userBands, userShindigs } = this.state;

    const userBandComponents = userBands.map(band => (
      <UserBandListItem
        band={band}
        key={band.id}
      />
    ));

    const userShindigComponents = userShindigs.map(shindig => (
      <UserShindigListItem
        shindig={shindig}
        key={shindig.id}
        />
    ));

    const makeJumbotronContent = () => {
      if (userBands.length < 1 || userBands === undefined) {
        return (
          <p>You are in no bands.</p>
        );
      } return (
        <div>
          <p className="lead text-blue" >You are currently a member of:</p>
          {userBandComponents}
          <hr className="my-2" />
          <p className="text-blue">Here are your upcoming shindigs:</p>
          {userShindigComponents}
        </div>
      );
    };

    return (
      <div className="home">
        <Jumbotron className="light-jumbotron">
          <h1 className="display-3 text-blue">Hello, {user.firstName}!</h1>
          {makeJumbotronContent()}
        </Jumbotron>
        <Container className="mx-auto">
          <Row>
            <Col>
              <div className="card border-dark am-tile jumbo-card" id="postings" onClick={this.goToPostings}>
                  <div className="card-body text-center">
                      <h4 className="card-title"><i className="fas fa-search fa-6x"></i></h4>
                      <h4 className="card-text">Find A Band To Join</h4>
                  </div>
              </div>
            </Col>
            <Col>
              <div className="card border-dark am-tile jumbo-card" id="orders" onClick={this.changeView}>
                  <div className="card-body text-center">
                      <h4 className="card-title"><i className="fas fa-plus-circle fa-6x"></i></h4>
                      <h4 className="card-text">Start A New Band</h4>
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
