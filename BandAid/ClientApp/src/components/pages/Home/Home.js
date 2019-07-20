import React from 'react';
import {
  Row,
  Col,
  Button,
  Jumbotron,
  Container,
} from 'reactstrap';

import userRequests from '../../../helpers/data/userRequests';

import './Home.scss';

class Home extends React.Component {
  state = {
    userId: 0,
    currentUser: {},
  }

  componentDidMount() {
    userRequests.getUserIdByEmail()
      .then((userId) => {
        this.setState({ userId });
        userRequests.getUserById(userId)
          .then((user) => {
            this.setState({ user });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="home">
        <Jumbotron className="light-jumbotron">
          <h1 className="display-3 text-blue">Hello, world!</h1>
          <p className="lead text-blue" >This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p className="text-blue">It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>
        <Container className="mx-auto">
          <Row>
            <Col>
              <div className="card border-dark am-tile myCard" id="postings" onClick={this.changeView}>
                  <div className="card-body text-center">
                      <h4 className="card-title"><i className="fas fa-search fa-6x"></i></h4>
                      <h4 className="card-text">Find A Band To Join</h4>
                  </div>
              </div>
            </Col>
            <Col>
              <div className="card border-dark am-tile myCard" id="orders" onClick={this.changeView}>
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
