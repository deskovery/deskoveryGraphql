import React, { Component } from 'react';
// import { connect } from 'react-redux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import captureVideoFrame from 'capture-video-frame';
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
      image: null
    };
    this.onCapture = this.onCapture.bind(this);
  }

  onCapture() {
    console.log(captureVideoFrame);
    const video = this.player.getInternalPlayer();
    console.log('video', video);
    const frame = captureVideoFrame('video', 'png');
    console.log('frame', frame);
    this.setState({ image: frame.dataUri });
  }
  // const {email} = props
  ref = youtube => {
    this.player = youtube;
  };

  render() {
    let player = null;
    return (
      <div>
        <YouTubePlayer
          url='https://www.youtube.com/watch?v=z5F1a7_dsrs'
          playing={this.state.playing}
          ref={this.ref}
          controls
        />
        <button type='button' onClick={this.onCapture}>
          {' '}
          Capture{' '}
        </button>
        {this.state.image && <img src={this.state.image} width='320px' />}
      </div>
    );
  }
}

// const mapState = state => {
//   return {
//     email: state.user.email
//   };
// };

export default UserHome;
