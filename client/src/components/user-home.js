import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
// import { connect } from 'react-redux';
import YouTubePlayer from "react-player/lib/players/YouTube";
import { Capture } from "./momentCapture";
import ControlledPopup from "./popup";
import LikeVideo from "./Video/LikeVideo";
import FactCarousel from "./FactCarousel";
import Journal from "./Journal";

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
      playVideo: this.props.location.state.video,
      playVideoIndex: 0,
      counter: 0
    };
    this.addToFavs = this.addToFavs.bind(this);
  }

  ref = youtube => {
    this.player = youtube;
  };

  componentDidMount() {
    console.log(this.state.playVideo, "video array");
  }

  addToFavs() {
    let itemsArray = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];

    itemsArray.push(this.state.videoSrc);
    localStorage.setItem("items", JSON.stringify(itemsArray));
  }

  openFacts = () => {
    this.setState({
      openFacts: !this.state.openFacts
    });
  };

  openJournal = () => {
    this.setState({
      openJournal: !this.state.openJournal
    });
  };

  skipFlight = () => {
    this.setState({ takeoff: false });
  };

  goBack = () => {
    let index = this.state.counter - 1;

    this.setState({
      playVideoIndex: index
    });

    this.setState({
      counter: index
    });
  };

  goNext = () => {
    let index = this.state.counter + 1;

    this.setState({
      playVideoIndex: index
    });
    this.setState({
      counter: index
    });
    
  };

  render() {
    setTimeout(() => {
      this.setState({ takeoff: false });
    }, 7800);
    if (this.state.takeoff) {
      return (
        <div>
        <h1 id="welcomeHeader">Up, up, and away . . .</h1>
        <div className="takeoff">
          <img
            className="takeoffGif"
            src="https://cdn.dribbble.com/users/1303437/screenshots/3492466/plane_800x600.gif"
            alt="prepare for takeoff."
          />
          <div className="skipContainer">
            <button className="skip" onClick={this.skipFlight}>
              Skip
            </button>
          </div>
        </div>
      );
    } else {
      setTimeout(() => {
        this.setState({ welcome: false });
      }, 2850);
      if (this.state.welcome && !this.state.takeoff) {
        return (
          <div >
            <h1 id="welcomeHeader">Welcome to your destination!</h1>
            <div id="passport-gif">
              <img
                id="passport-gif"
                src="https://cdn.dribbble.com/users/1022424/screenshots/3395922/tickets_and_passport_dribble.gif"
              />
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="videoContainer">
              {this.state.openFacts ? (
                <FactCarousel destination={this.state.playVideo} />
              ) : null}

              <YouTubePlayer
                url={`https://www.youtube.com/watch?v=${
                  this.state.playVideo[this.state.playVideoIndex]
                }`}
                playing={this.state.playing}
                ref={this.ref}
                width="70vw"
                height="70vh"
                controls
              />
            </div>
            <div className="journal">
              {this.state.openJournal ? <Journal /> : null}
            </div>
            <div className="user-home-buttons">
              <button className="next-button" onClick={this.goBack}>
            <span>&#8592;</span>
              </button>
              <ControlledPopup videoSrc={this.state.playVideo[this.state.playVideoIndex]} />
              {/* {this.state.videoSrc ? (
                <Capture videoSrc={this.state.playVideo} />
              ) : null} */}

              <button className="user-home-buttons" onClick={this.openJournal}>
                Journal
              </button>
              <button className="user-home-buttons" onClick={this.openFacts}>
                Facts
              </button>
              <button className="next-button" onClick={this.goNext}>
              <span>&#8594;</span>
              </button>
              <LikeVideo
                _id={this.state.playVideo}
                className="user-home-buttons"
              />
            </div>
          </div>
        );
      }
    }
  }
}

export default UserHome;
