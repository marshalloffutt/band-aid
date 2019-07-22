import React from 'react';
import firebase from 'firebase/app';
import {
  Route,
  BrowserRouter,
  Redirect,
  Switch,
} from 'react-router-dom';

import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Postings from '../components/pages/Postings/Postings';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import UserProfile from '../components/pages/UserProfile/UserProfile';

import './App.scss';
import userRequests from '../helpers/data/userRequests';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {... rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    currentUser: {},
  }

  getUser = () => {
    userRequests.getUser()
      .then((user) => {
        this.setState({ currentUser: user });
      });
  }

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getUser();
        this.setState({
          authed: true,
        });
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount = () => {
    this.removeListener();
  }

  render() {
    const { authed, currentUser } = this.state;
    const logoutClicky = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
              <MyNavbar isAuthed={authed} currentUser={currentUser} logoutClicky={logoutClicky}/>
              <Switch>
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                <PrivateRoute path='/postings' component={Postings} authed={this.state.authed} />
                <PrivateRoute path='/user:id' component={UserProfile} authed={this.state.authed} />
                <PublicRoute path='/auth' exact component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
