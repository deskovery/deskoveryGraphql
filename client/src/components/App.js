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
    staggeredChildren: 100,
  },
  hidden: {
    x: '-100%',
  },
});

class App extends React.Component {
  state = {
    on: false,
  };

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ on: !this.state.on });
  };
  render() {
    return (
      <div className="App">
        <div className="aboutContent">
          <h1>
            Immerse Yourself in the <strong>Wild</strong> with Deskovery
          </h1>
          <p>
            Deskovery is a collection of live wildlife video streams tailored to
            the sentiments of the user. We cover all the terrain options,
            starting with Sea or Land. Depending on your choices, we will route
            you to the ocean,seashore, forest, and mountain.
          </p>
          <p>
            Once you arrive at your destination, you will be greeted with the
            presence of nature in real-time. The goal is to allow our users the
            chance to experience nature without leaving their seats! While at
            the Deskovery channel, we hope you enjoy the sounds of nature and
            are reminded of its beauty.
          </p>
          <h3>How To Navigate This Site</h3>
          <p>
            Each image/gif is a representation of a different part of the world.
            We have land, sea, mountain, forest, ocean, shore, and space! Simply
            click on the image/gif that intrigues you the most and enjoy a feed
            of livestream videos.
          </p>
          <p>
            Once at your final destination, you can capture the moment, with our
            capture the moment button, allowing you to make gifs or take a
            snapshot of the wild animals. We also provide you with a journal in
            case you would like to reflect on your virtual experience in nature.
            This journal is draggable, so we invite you to place it where you
            like. If you're curious to learning more about the animals you're
            watching, be sure to click on the facts button! This feature will
            satisfy your curiousity.
          </p>
          <p>We hope you enjoy your time at Deskovery!</p>
          <h3>Special Thanks</h3>
          <p>
            We couldn't have made this project without the wonderful artists at{' '}
            <a href="https://dribbble.com/" target="_blank">
              Dribble.com
            </a>
            , who provided the Gifs.
          </p>
          <h3>Oh, the places you will go...</h3>
          <Query query={GET_ALL_VIDEOS}>
            {({ data, loading, error }) => {
              if (loading) return <Spinner />;
              if (error) return <div>Error</div>;
              const { on } = this.state;
              return (
                <VideoList pose={on ? 'shown' : 'hidden'} className="cards">
                  {data.getAllVideos.map(video => (
                    <VideoItem key={video._id} {...video} />
                  ))}
                </VideoList>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default App;
