import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { Capture } from './momentCapture';
import ControlledPopup from './popup';
import LikeVideo from './Video/LikeVideo';
import FactCarousel from './FactCarousel';
import Journal from './Journal';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      image: null,
      videoSrc: null,
      loading: false,
      takeoff: true,
      welcome: true,
      openFacts: false,
      openJournal: false,
      playVideo: this.props.match.params._id || this.props.location.state.video,
    };
    this.addToFavs = this.addToFavs.bind(this);
  }

  ref = youtube => {
    this.player = youtube;
  };

  addToFavs() {
    console.log(this.state.videoSrc, 'FAVS');
    let itemsArray = localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items'))
      : [];

    itemsArray.push(this.state.videoSrc);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    console.log(localStorage, 'localStorage');
  }

  openFacts = () => {
    this.setState({
      openFacts: !this.state.openFacts,
    });
  };

  openJournal = () => {
    this.setState({
      openJournal: !this.state.openJournal,
    });
  };

  render() {
    console.log(this.props);
    setTimeout(() => {
      this.setState({ takeoff: false });
    }, 6000);
    if (this.state.takeoff) {
      return (
        <div className="takeoff">
          <img
            className="takeoffGif"
            src="https://cdn.dribbble.com/users/1303437/screenshots/3492466/plane_800x600.gif"
            alt="prepare for takeoff."
          />
        </div>
      );
    } else {
      setTimeout(() => {
        this.setState({ welcome: false });
      }, 1000);
      if (this.state.welcome) {
        return (
          <div>
            <h1 id="welcomeHeader">Welcome to your destination!</h1>
          </div>
        );
      } else {
        return (
          <div className="videoContainer">
            <YouTubePlayer
              url={`https://www.youtube.com/watch?v=${this.state.playVideo}`}
              playing={this.state.playing}
              ref={this.ref}
              width="100vw"
              //max-width="100%"
              height="70vh"
              controls
            />
            {this.state.openFacts ? (
              <FactCarousel destination={this.state.playVideo} />
            ) : null}
            {this.state.openJournal ? <Journal /> : null}
            {this.state.videoSrc ? (
              <Capture videoSrc={this.state.videoSrc} />
            ) : null}
            <ControlledPopup videoSrc={this.state.playVideo} />
            {/* <LikeVideo _id={this.state.playVideo} /> */}
            <button className="Favorites" onClick={this.addToFavs}>
              Add To Favorites
            </button>
            <button className="popupButton" onClick={this.openJournal}>
              Journal
            </button>
            <button className="popupButton" onClick={this.openFacts}>
              Facts
            </button>
          </div>
        );
      }
    }
  }
}

export default UserHome;
