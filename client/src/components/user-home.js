import React, { Component } from "react";
// import { connect } from 'react-redux';
import YouTubePlayer from "react-player/lib/players/YouTube";
import { Capture } from "./momentCapture";
import axios from "axios";
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
      videoSrc: null
    };
    this.onCapture = this.onCapture.bind(this);
  }

  videoSrc = null;

  async onCapture() {
    const { data } = await axios.post("/api/videos");
    const path = data.path.replace("./api/public", "");
    this.setState({ videoSrc: `http://localhost:3000/api${path}` });
    console.log("SET STATE:", this.state);
  }
  // const {email} = props
  ref = youtube => {
    this.player = youtube;
  };

  render() {
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
          {" "}
          Capture Moment{" "}
        </button>
        {this.videoSrc ? <Capture videoSrc={this.videoSrc} /> : "No capture"}
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
