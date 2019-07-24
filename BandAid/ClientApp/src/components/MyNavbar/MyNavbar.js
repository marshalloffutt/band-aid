import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
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
    const { isAuthed, logoutClicky, currentUser } = this.props;
    const profileImage = currentUser.imageUrl;
    const { id } = currentUser;

    const buildDropdown = () => {
      if (isAuthed) {
        return (
          <UncontrolledDropdown>
                <DropdownToggle nav caret>
                  <img className="navIcon photoIcon" src={profileImage} alt="userphoto" />
                </DropdownToggle>
                <DropdownMenu right className="dropdown-menu-slate" >
                  <DropdownItem tag={RRNavLink} className="dd-link nav-link" to={`/profile/${id}`} >Your Profile</DropdownItem>
                  <DropdownItem className="dd-link nav-link" onClick={logoutClicky} to="/home">Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
        );
      } return '';
    };

    return (
      <div className="my-navbar">
        <Navbar className="slate" dark expand="md">
          { isAuthed ? <NavbarBrand className="nav-brand" href="/">Band<span className="gold">★</span>Aid</NavbarBrand> : ''}
          <NavbarToggler onClick={e => this.toggle(e)}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="nav-link">
                { isAuthed ? <NavLink tag={RRNavLink} to='/postings'>Postings</NavLink> : ''}
              </NavItem>
              <NavItem className="nav-link">
                { isAuthed ? <NavLink tag={RRNavLink} to='/bands'>Bands</NavLink> : ''}
              </NavItem>
              {buildDropdown()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
