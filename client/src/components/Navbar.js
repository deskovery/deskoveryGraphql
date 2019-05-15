import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './Auth/Signout';

const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul className="navbar">
      <li>
        <NavLink to="/quiz">{'<'}</NavLink>
      </li>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li id="welcome">
        Hello, <strong>{session.getCurrentUser.username}</strong>
      </li>
      <Signout />
    </ul>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul className="navbar">
    <li>
      <NavLink to="/quiz">{'<'}</NavLink>
    </li>
    <li>
      <NavLink to="/" exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/about">About</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Sign In</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Sign Up</NavLink>
    </li>
  </ul>
);

export default Navbar;
