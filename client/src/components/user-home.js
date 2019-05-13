import React, { Component } from 'react';
// import { connect } from 'react-redux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { Capture } from './momentCapture';
import ControlledPopup from './popup';
import LikeVideo from './Video/LikeVideo';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      image: null,
      videoSrc: null,
      loading: false,
      takeoff: true,
      welcome: true
    };
  }
  ref = youtube => {
    this.player = youtube;
  };
  render() {
    console.log(this.props);
    setTimeout(() => {
      this.setState({ takeoff: false });
    }, 6000);
    if (this.state.takeoff) {
      return (
        <div className='takeoff'>
          <img
            className='takeoffGif'
            src='https://cdn.dribbble.com/users/1303437/screenshots/3492466/plane_800x600.gif'
            alt='prepare for takeoff.'
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
            <h1>Welcome to your destination!</h1>
          </div>
        );
      } else {
        return (
          <div className='videoContainer'>
            <YouTubePlayer
              url={`https://www.youtube.com/watch?v=${
                this.props.location.state.video
              }`}
              playing={this.state.playing}
              ref={this.ref}
              width='1000px'
              max-width='100%'
              height='800px'
              controls
            />
            <div className='buttonDiv'>
              {this.state.videoSrc ? (
                <Capture videoSrc={this.state.videoSrc} />
              ) : null}
              <ControlledPopup videoSrc={this.props.location.state.video} />
              <LikeVideo _id={this.props.location.state.video} />
            </div>
          </div>
        );
      }
    }
  }
}

export default UserHome;
