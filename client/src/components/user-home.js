import React, { Component } from 'react';
// import { connect } from 'react-redux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { Capture } from './momentCapture';
import ControlledPopup from './popup';

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
    };
  }

  ref = youtube => {
    this.player = youtube;
  };

  render() {
    setTimeout(() => {
      this.setState({ takeoff: false });
    }, 9000);
    if (this.state.takeoff) {
      return (
        <div>
          <img
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
            <h1>Welcome to your destination!</h1>
          </div>
        );
      } else {
        return (
          <div>
            <YouTubePlayer
              url={`https://www.youtube.com/watch?v=${
                this.props.location.state.video
              }`}
              playing={this.state.playing}
              ref={this.ref}
              controls
            />
            {this.state.videoSrc ? (
              <Capture videoSrc={this.state.videoSrc} />
            ) : null}
            <ControlledPopup videoSrc={this.props.location.state.video} />
          </div>
        );
      }
    }
  }
}

export default UserHome;
