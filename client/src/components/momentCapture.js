import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import captureVideoFrame from 'capture-video-frame';
import gifshot from 'gifshot';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';

export class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: null,
      playing: true,
      image: null,
      gif: null,
      gifText: '',
      gifTextFont: 'sans-serif',
      gifTextColor: '#ffffff',
      shareUrl: null,
    };
    this.takeSnapshot = this.takeSnapshot.bind(this);
    this.makeGif = this.makeGif.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getShareLink = this.getShareLink.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.videoSrc, 'Videosource');

    this.setState({ videoSrc: this.props.videoSrc });
    console.log(this.state, 'STATTTE');
  }

  takeSnapshot() {
    const frame = captureVideoFrame(this.player.getInternalPlayer());
    this.setState({ image: frame.dataUri });
  }

  async getShareLink() {
    const { data } = await axios.post('/api/gifs', { imgData: this.state.gif });
    console.log(data);
    const shareUrl = data.replace('./api/public', 'api');
    console.log(shareUrl);
    this.setState({ shareUrl: shareUrl, gif: shareUrl });
  }

  makeGif() {
    gifshot.createGIF(
      {
        video: [this.state.videoSrc],
        gifWidth: 300,
        gifHeight: 200,
        text: this.state.gifText,
        fontSize: '16px',
        fontColor: this.state.gifTextColor,
        numFrames: 20,
        interval: 0.1,
        frameDuration: 1,
        sampleInterval: 10,
        numWorkers: 2,
      },
      obj => {
        if (!obj.error) {
          var image = obj.image,
            animatedImage = document.createElement('img');
          animatedImage.src = image;
          this.setState({ gif: image });
        }
      }
    );
  }

  ref = player => {
    this.player = player;
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="moments">
        <div className="momentsInner">
          <ReactPlayer
            url={this.state.videoSrc}
            playing={this.state.playing}
            ref={this.ref}
            controls
          />{' '}
          <div className="buttons">
            <div className="innerButtons">
              <button type="button" onClick={this.takeSnapshot}>
                {' '}
                Take Snapshot{' '}
              </button>
              <button type="button" onClick={this.makeGif}>
                {' '}
                Make Gif{' '}
              </button>
              <br />
              <input
                type="text"
                name="gifText"
                value={this.state.gifText}
                onChange={this.handleChange}
              />
              <select name="gifTextColor" onChange={this.handleChange}>
                <option value="none">Choose gif text: </option>

                <option value="#00BFFF">Blue</option>
                <option value="#BA55D3">Purple</option>
                <option value="#3CB371">Green</option>
                <option value="#DC143C">Red</option>
                <option value="#FF8C00">Orange</option>
                <option value="#FFFF33">Yellow</option>
                <option value="#000000">Black</option>
                <option value="#FFFFFF">White</option>
              </select>
            </div>
          </div>
          <div className="images">
            {this.state.gifLoading ? <SyncLoader /> : null}
            {this.state.gif ? (
              <div>
                <img src={this.state.gif} className="img" alt={'Your gif!'} />
              </div>
            ) : null}
            {this.state.image && (
              <img
                src={this.state.image}
                className="img"
                alt={'Your snapshot!'}
              />
            )}
          </div>
          {this.state.gif ? (
            <div className="shareBox">
              <button type="button" onClick={this.getShareLink}>
                Share
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
