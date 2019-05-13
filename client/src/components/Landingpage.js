import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landingpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className='landing-page-welcome'>Welcome to DESKOVERY!</h1>

        <div className='landing-page-text'>
          <Link to={`/quiz`}>
            <img
              className='landing-gif'
              src='https://cdn.dribbble.com/users/2033130/screenshots/5418198/fox_jungle_dribbble.gif'
            />
            <button className='button landing'>Your journey starts here</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landingpage;
