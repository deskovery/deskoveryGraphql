import React from 'react';
import './App.css';
import VideoItem from './Video/VideoItem';
import posed from 'react-pose';

import { Query } from 'react-apollo';
import { GET_ALL_VIDEOS } from '../queries';
import Spinner from './Spinner';

const VideoList = posed.ul({
  shown: {
    x: '0%',
    staggeredChildren: 100
  },
  hidden: {
    x: '-100%'
  }
});

class App extends React.Component {
  state = {
    on: false
  };

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ on: !this.state.on });
  };
  render() {
    return (
      <div className='App'>
        <h1 className='main-title'>
          Immerse Yourself in the <strong>Wild</strong> with Deskovery
        </h1>
        <p>
          The Deskovery channel is a collection of live, wildlife, video streams
          tailored to the sentiments of the user. We cover all the terrain
          options, starting with Sea or Land. Depending on your choices, we will
          either route you to the ocean and seashore or the forest and mountain.
        </p>
        <p>
          Once you arrive at your destination, you will be greeted with the
          presence of nature in real-time. The goal is to allow our users the
          chance to experience nature without leaving their seats! While at the
          Deskovery channel, we hope you enjoy the sounds of nature and are
          reminded of its beauty.
        </p>
        <div className='card-container'>
          <div className='card-image'>
            <h1 className='front'>hello</h1>
            <h1 className='back'>goodbye</h1>
          </div>
        </div>
        <h3>Oh, the places you will go...</h3>
        <Query query={GET_ALL_VIDEOS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            const { on } = this.state;
            return (
              <VideoList pose={on ? 'shown' : 'hidden'} className='cards'>
                {data.getAllVideos.map(video => (
                  <VideoItem key={video._id} {...video} />
                ))}
              </VideoList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
