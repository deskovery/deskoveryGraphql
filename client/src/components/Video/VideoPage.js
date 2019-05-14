import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_VIDEO } from '../../queries';
import LikeVideo from './LikeVideo';
import Spinner from '../Spinner';

const VideoPage = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query query={GET_VIDEO} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) {
          console.log(error);
          return <div>Error</div>;
        }

        return (
          <div className="App">
            <div className="video-header">
              <h2 className="video-name">
                <strong>{data.getVideo.name}</strong>
              </h2>

              <img src={data.getVideo.gifs[0]} alt="gif" />
              <p>
                Created by <strong>{data.getVideo.name}</strong>
              </p>
              <p>
                <span role="img" aria-label="heart">
                  ❤️
                </span>
              </p>
            </div>
            <div className="video-instructions" />
            <LikeVideo _id={_id} />
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(VideoPage);
