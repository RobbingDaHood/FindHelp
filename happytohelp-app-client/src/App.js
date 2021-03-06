import React, {Component} from 'react';
import RouteNavItem from './components/RouteNavItem';
import {withRouter, Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import './App.css';
import Routes from './Routes';

class App extends Component {
  handleNavLink = (event) => {
    event.preventDefault();
    var testing = "Testing!";
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">🙂 Happy to Help</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <RouteNavItem onClick={this.handleNavLink} href="/signup">Signup</RouteNavItem>
              <RouteNavItem onClick={this.handleNavLink} href="/login">Login</RouteNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes/>
      </div>
    );
  }
}

export default withRouter(App);
