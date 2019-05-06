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
          Immerse Yourself in the <strong>Wild</strong>
        </h1>
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
