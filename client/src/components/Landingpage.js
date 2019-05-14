import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landingpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="content">
        <h1 id="journeyHeader">Welcome to Deskovery!</h1>
        <div id="landing-page-text">
          <Link to={`/quiz`} id="journeyLink">
            {/* <img
              className="landing-gif"
              src="https://cdn.dribbble.com/users/2033130/screenshots/5418198/fox_jungle_dribbble.gif"
            /> */}
            <div id="journey">
              <div id="jbContainer">
                <button id="journeyButton">Your journey starts here</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landingpage;
