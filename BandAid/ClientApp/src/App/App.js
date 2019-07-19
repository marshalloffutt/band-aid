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
import MyNavbar from '../components/MyNavbar/MyNavbar';

import './App.scss';

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
  }

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
    const { authed } = this.state;
    const logoutClicky = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClicky={logoutClicky}/>
              <Switch>
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                <PrivateRoute path='/home' exact component={Home} authed={this.state.authed} />
                <PublicRoute path='/auth' exact component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
