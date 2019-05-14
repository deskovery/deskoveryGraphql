import React, { Component } from "react";
import ReactPlayer from "react-player";
import captureVideoFrame from "capture-video-frame";
import gifshot from "gifshot";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { GithubPicker } from "react-color";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

export class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: null,
      playing: true,
      image: null,
      gifText: "",
      gifTextFont: "sans-serif",
      gifTextColor: "#ffffff",
      shareUrl: null,
      gifLoading: false
    };
    this.takeSnapshot = this.takeSnapshot.bind(this);
    this.makeGif = this.makeGif.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getShareLink = this.getShareLink.bind(this);
  }

  async componentDidMount() {
    this.setState({ videoSrc: this.props.videoSrc });
  }

  takeSnapshot() {
    const frame = captureVideoFrame(this.player.getInternalPlayer());
    this.setState({ image: frame.dataUri });
  }

  async getShareLink() {
    const { data } = await axios.post("/api/gifs", {
      imgData: this.state.image
    });
    const shareUrl = data.replace("./api/public", "api");
    this.setState({ shareUrl: shareUrl, image: shareUrl });
  }

  makeGif() {
    this.setState({ gifLoading: true });
    gifshot.createGIF(
      {
        video: [this.state.videoSrc],
        gifWidth: 300,
        gifHeight: 200,
        text: this.state.gifText,
        fontSize: "18px",
        fontColor: this.state.gifTextColor,
        numFrames: 20,
        interval: 0.1,
        frameDuration: 1,
        sampleInterval: 10,
        numWorkers: 2,
        fontWeight: "bold"
      },
      obj => {
        if (!obj.error) {
          var image = obj.image,
            animatedImage = document.createElement("img");
          animatedImage.src = image;
          this.setState({ image: image, gifLoading: false });
        }
      }
    );
  }

  ref = player => {
    this.player = player;
  };

  handleChange(event) {
    console.log(event, "what is event");
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleColorChange = color => {
    this.setState({
      gifTextColor: color.hex
    });
  };

  render() {
    const { shareUrl } = this.state;
    const disableSnap = this.state.gifText;
    return (
      <div className="moments">
        <div id="popupPlayer">
          <ReactPlayer
            url={this.state.videoSrc}
            playing={this.state.playing}
            ref={this.ref}
            width="90%"
            height="auto"
            controls
          />{" "}
        </div>
        <div className="momentsInner">
          <div className="buttons">
            <div className="innerButtons">
              <input
                type="text"
                name="gifText"
                value={this.state.gifText}
                onChange={this.handleChange}
              />
              <GithubPicker
                onClick={this.handleChange}
                color={this.state.color}
                onChange={this.handleColorChange}
              />
              {/* <select name="gifTextColor" onChange={this.handleChange}>
                <option value="none">text color: </option>

                <option value="#00BFFF">Blue</option>
                <option value="#BA55D3">Purple</option>
                <option value="#3CB371">Green</option>
                <option value="#DC143C">Red</option>
                <option value="#FF8C00">Orange</option>
                <option value="#FFFF33">Yellow</option>
                <option value="#000000">Black</option>
                <option value="#FFFFFF">White</option>
              </select> */}
              <button type="button" onClick={this.makeGif}>
                {" "}
                Make Gif{" "}
              </button>
              <br />
              <button
                type="button"
                onClick={this.takeSnapshot}
                disabled={disableSnap}
              >
                {" "}
                Take Snapshot{" "}
              </button>
              <br />
            </div>
          </div>
          <div className="images">
            {this.state.gifLoading ? <SyncLoader /> : null}
            {this.state.image && (
              <img
                src={this.state.image}
                className="img"
                alt={"Your snapshot!"}
              />
            )}
          </div>
          {this.state.image ? (
            <div className="shareBox">
              <button type="button" onClick={this.getShareLink}>
                Share
              </button>
              {shareUrl && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FacebookShareButton url={shareUrl} quote="Facebook">
                    <FacebookIcon size={32} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title="Twitter">
                    <TwitterIcon size={32} />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title="Linkedin">
                    <LinkedinIcon size={32} />
                  </LinkedinShareButton>
                  <EmailShareButton
                    url={shareUrl}
                    subject="My Deskovery Gif"
                    body={shareUrl}
                  >
                    <EmailIcon size={32} />
                  </EmailShareButton>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
