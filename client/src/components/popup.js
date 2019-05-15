import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Capture } from "./momentCapture.js";
import axios from "axios";

class ControlledPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, loading: null, videoSrc: null };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await axios.post("/api/videos", {
      videoSrc: this.props.videoSrc
    });
    console.log(this.state.videoSrc, "video in popup CDM");
    console.log(data, "PATH IN POPUP");
    const path = data.path.replace("./videos/public/", "");
    this.setState({ videoSrc: `${path}`, loading: false });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.videoSrc !== prevProps.videoSrc) {
      this.setState({ loading: true });
      const { data } = await axios.post("/api/videos", {
        videoSrc: this.props.videoSrc
      });
      console.log(this.state.videoSrc, "video in popup CDM");
      console.log(data, "PATH IN POPUP");
      const path = data.path.replace("./videos/public/", "");
      this.setState({ videoSrc: `${path}`, loading: false });
    }
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <div>
          <button className="user-home-buttons" onClick={this.openModal}>
            Capture moment
          </button>
        </div>
        <div className="modal">
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="modal">
              <a className="close" onClick={this.closeModal}>
                &times;
              </a>

              {this.state.loading ? (
                <img
                  className="loading"
                  src="https://cdn.dribbble.com/users/206755/screenshots/4927172/error_404_animation_800x600.gif"
                  alt="Looking for your moment."
                />
              ) : (
                <Capture videoSrc={this.state.videoSrc} />
              )}
            </div>
          </Popup>
        </div>{" "}
      </div>
    );
  }
}

// => (
//   <Popup trigger={<button>Trigger</button>} position="right-center">
//   <div>

// Popup stuff</div>
//   </Popup>
// )

export default ControlledPopup;
