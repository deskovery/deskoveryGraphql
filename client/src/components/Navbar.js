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
    <ul className='navbar'>
      <li>
        <NavLink to='/quiz'>{'<'}</NavLink>
      </li>
      <li>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/search'>Search</NavLink>
      </li>
      <li>
        <NavLink to='/about'>About</NavLink>
      </li>
      <li>
        <NavLink to='/user'>User-Home</NavLink>
      </li>
      <li>
        <NavLink to='/profile'>Profile</NavLink>
      </li>
      <Signout />
    </ul>
    <h4 style={{ color: 'grey' }}>
      Hello, <strong>{session.getCurrentUser.username}</strong>
    </h4>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul className='navbar'>
    <li>
      <NavLink to='/quiz'>{'<'}</NavLink>
    </li>
    <li>
      <NavLink to='/' exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to='/app'>About</NavLink>
    </li>
    <li>
      <NavLink to='/search'>Search</NavLink>
    </li>
    <li>
      <NavLink to='/signin'>Signin</NavLink>
    </li>
    <li>
      <NavLink to='/signup'>Signup</NavLink>
    </li>
  </ul>
);

export default Navbar;
