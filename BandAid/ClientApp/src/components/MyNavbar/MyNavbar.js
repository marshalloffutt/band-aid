import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClicky: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClicky } = this.props;

    return (
      <div className="my-navbar">
        <Navbar style={{ backgroundColor: '#1f325a' }} dark expand="md">
          <NavbarBrand href="/">Band★Aid</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="nav-link">
              { isAuthed ? <NavLink className='logout-link' onClick={logoutClicky}>Logout</NavLink> : ''}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;