import React, { Component } from 'react';
// import { connect } from 'react-redux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { Capture } from './momentCapture';
import axios from 'axios';
import ControlledPopup from './popup';
// import {captureVideoFrame} from '../utils/capture'

/**
 * COMPONENT
 *
 */

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
    // this.onCapture = this.onCapture.bind(this);
  }

  // videoSrc = null;
  // // {videoSrc: this.state.videoSrc});
  // async onCapture() {
  //   this.setState({ loading: true });
  //   const { data } = await axios.post('/api/videos', {
  //     videoSrc: this.props.location.state.video,
  //   });
  //   const path = data.path.replace('./api/public', '');
  //   this.setState({ videoSrc: `api${path}`, loading: false });
  //   console.log('SET STATE:', this.state);
  // }
  // const {email} = props
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
            <button type="button" onClick={this.onCapture}>
              {' '}
              Capture Moment{' '}
            </button>
            {/* {this.state.loading ? (
              <img
                className="loading"
                src="https://cdn.dribbble.com/users/206755/screenshots/4927172/error_404_animation_800x600.gif"
                alt="Looking for your moment."
              />
            ) : null} */}
            {this.state.videoSrc ? (
              <Capture videoSrc={this.state.videoSrc} />
            ) : (
              null
            )}
            <ControlledPopup videoSrc={this.props.location.state.video} />
          </div>
        );
      }
    }
  }
}
// const mapState = state => {
//   return {
//     email: state.user.email
//   };
// };

export default UserHome;
