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
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/favorites'>Favorites</NavLink>
      </li>
      {/* <li>
        <NavLink to='/user'>User-Home</NavLink>
      </li> */}
      {/* <li>
        <NavLink to='/capture'>Capture</NavLink>
      </li> */}
      {/* <li>
        <NavLink to='/video/add'>Add Video</NavLink>
      </li> */}
      <li>
        <NavLink to='/profile'>Profile</NavLink>
      </li>
      <Signout />
    </ul>
    <h4>
      Welcome, <strong>{session.getCurrentUser.username}</strong>
    </h4>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul className='navbar'>
    <li>
      <NavLink to='/' exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to='/quiz'>Back to Quiz</NavLink>
    </li>
    <li>
      <NavLink to='/user'>User-Home</NavLink>
    </li>
    {/* <li>
      <NavLink to='/capture'>Capture</NavLink>
    </li> */}
    {/* <li>
      <NavLink to='/search'>Search</NavLink>
    </li> */}
    <li>
      <NavLink to='/signin'>Signin</NavLink>
    </li>
    <li>
      <NavLink to='/signup'>Signup</NavLink>
    </li>
  </ul>
);

export default Navbar;
