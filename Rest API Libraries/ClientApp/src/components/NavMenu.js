import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">Rest_API_Libraries</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
                <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-white" to="/allReservations">Visos rezervacijos</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={Link} className="text-white" to="/allEbooks">Visos ebooks</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={Link} className="text-white" to="/allCities">Visi miestai</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={Link} className="text-white" to="/allBooks">Visos books</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={Link} className="text-white" to="/login">Prisijungimas</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={Link} className="text-white" to="/register">Registracija</NavLink>
                </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
