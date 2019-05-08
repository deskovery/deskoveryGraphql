import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_VIDEO } from '../../queries';
// import LikeVideo from './LikeVideo';
import Spinner from '../Spinner';

const VideoPage = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query query={GET_VIDEO} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <div>Error</div>;

        return (
          <div className='App'>
            <div
              style={{
                background: `url(${
                  data.getVideo.imageUrl
                }) center center / cover no-repeat`
              }}
              className='video-image'
            />
            <div className='video'>
              <div className='video-header'>
                <h2 className='video-name'>
                  <strong>{data.getVideo.name}</strong>
                </h2>
                <h5>
                  <strong>{data.getVideo.path}</strong>
                </h5>
                <p>
                  Created by <strong>{data.getVideo.username}</strong>
                </p>
                <p>
                  {data.getVideo.likes}{' '}
                  <span role='img' aria-label='heart'>
                    ❤️
                  </span>
                </p>
              </div>
              <blockquote className='video-description'>
                {data.getVideo.description}
              </blockquote>
              <h3 className='video-instructions__title'>Instructions</h3>
              <div
                className='video-instructions'
                dangerouslySetInnerHTML={{
                  __html: data.getVideo.instructions
                }}
              />
              {/* <LikeVideo _id={_id} /> */}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(VideoPage);
