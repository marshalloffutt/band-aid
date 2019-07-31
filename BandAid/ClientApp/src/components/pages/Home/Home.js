import React from 'react';
import {
  Jumbotron,
  Button,
} from 'reactstrap';

import UserBandListItem from './UserBandListItem/UserBandListItem';
import UserShindigListItem from './UserShindigListItem/UserShindigListItem';
import AddBandModal from '../../Modals/AddBandModal';

import userRequests from '../../../helpers/data/userRequests';
import shindigRequests from '../../../helpers/data/shindigRequests';
import bandRequests from '../../../helpers/data/bandRequests';
import bandMemberRequests from '../../../helpers/data/bandMemberRequests';

import './Home.scss';

class Home extends React.Component {
  state = {
    userId: 0,
    user: {},
    userBands: [],
    userShindigs: [],
    myBand: [],
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

  submitNewBand = (band) => {
    bandRequests.createBand(band)
      .then((myBand) => {
        const bandMember = {};
        bandMember.musicianId = this.state.user.id;
        bandMember.bandId = myBand.data.id;
        bandMember.dateJoined = new Date();
        bandMemberRequests.createBandMember(bandMember);
      });
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
          <div>
            <div className="mt-4">
              <Button color="danger" size="large" onClick={this.goToPostings}>Find Your Next Band!</Button>
            </div>
            <div className="mt-4">
              <Button color="danger" size="large" onClick={this.goToBand}>Start a Band</Button>
            </div>
          </div>
        );
      } return (
        <div>
          <p className="lead text-white" >You are currently a member of:</p>
          {userBandComponents}
          <hr className="my-2" />
          <p className="text-white">Here are your upcoming shindigs:</p>
          {userShindigComponents}
          <div className="mt-4">
              <Button color="danger" size="large" onClick={this.goToPostings}>Find Your Next Band!</Button>
            </div>
            <div className="mt-4">
              <AddBandModal
                color="danger"
                size="large"
                buttonLabel="Create a Band"
                onSubmit={this.submitNewBand}
                />
            </div>
        </div>
      );
    };

    return (
      <div className="home">
          <Jumbotron className="light-jumbotron">
              <h1 className="display-3 text-black">Hello, {user.firstName}!</h1>
              {makeJumbotronContent()}
          </Jumbotron>
      </div>
    );
  }
}

export default Home;
