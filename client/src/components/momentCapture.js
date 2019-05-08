import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import captureVideoFrame from 'capture-video-frame';
import gifshot from 'gifshot';
import { SyncLoader } from 'react-spinners';

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
    };
    this.takeSnapshot = this.takeSnapshot.bind(this);
    this.makeGif = this.makeGif.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.setState({ videoSrc: this.props.videoSrc });
  }

  takeSnapshot() {
    const frame = captureVideoFrame(this.player.getInternalPlayer());
    this.setState({ image: frame.dataUri });
  }

  gifHelper(obj) {
    if (!obj.error) {
      var image = obj.image,
        animatedImage = document.createElement('img');
      console.log(animatedImage, 'animated image');
      animatedImage.src = image;
      this.setState({ gifLoading: false });
      document.body.appendChild(animatedImage);
    }
  }

  makeGif() {
    gifshot.createGIF(
      {
        video: [this.state.videoSrc],
        gifWidth: 300,
        gifHeight: 200,
        text: this.state.gifText,
        fontSize: '16px',
        numFrames: 40,
        fontColor: this.state.gifTextColor,
        // progressCallback: function(captureProgress) {
        //   console.log('finished')
        // },
        // saveRenderingContexts: true,
        // crossOrigin: 'Anonymous'
        // savedRenderingContexts: ['Anonymous']
      },
      function(obj) {
        if (!obj.error) {
          var image = obj.image,
            animatedImage = document.createElement('img');
          animatedImage.src = image;
          document.body.appendChild(animatedImage);
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
      <div>
        <ReactPlayer
          url={this.state.videoSrc}
          playing={this.state.playing}
          ref={this.ref}
          controls
        />
        <button type="button" onClick={this.takeSnapshot}>
          {' '}
          Take Snapshot{' '}
        </button>
        <button type="button" onClick={this.makeGif}>
          {' '}
          Make Gif{' '}
        </button>
        <input
          type="text"
          name="gifText"
          value={this.state.gifText}
          onChange={this.handleChange}
        />
        <select name="gifTextColor" onChange={this.handleChange}>
          <option value="none">Choose gif texr: </option>

          <option value="#00BFFF">Blue</option>
          <option value="#BA55D3">Purple</option>
          <option value="#3CB371">Green</option>
          <option value="#DC143C">Red</option>
          <option value="#FF8C00">Orange</option>
          <option value="#FFFF33">Yellow</option>
          <option value="#000000">Black</option>
          <option value="#FFFFFF">White</option>
        </select>

        {this.state.gifLoading ? <SyncLoader /> : null}
        {this.state.gif ? <img src={this.state.gif} alt={'Your gif!'} /> : null}
        {this.state.image && <img src={this.state.image} width="320px" />}
      </div>
    );
  }
}
