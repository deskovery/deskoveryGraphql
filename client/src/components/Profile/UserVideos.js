import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_VIDEOS,
  GET_ALL_VIDEOS,
  UNLIKE_VIDEO,
  GET_CURRENT_USER,
} from '../../queries';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Spinner from '../Spinner';

class UserVideos extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete = unlikeVideo => {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      unlikeVideo().then(({ data }) => {});
    }
  };

  render() {
    const { username } = this.props;
    return (
      <Query query={GET_USER_VIDEOS} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          return (
            <div className="favesContainer">
              <h3>Your Favorites</h3>
              {!data.getUserVideos.length && (
                <strong>
                  <p>
                    You have not favorited any videos, yet. Go favorite some!
                  </p>
                </strong>
              )}
              <div id="allFavesContainer">
                {data.getUserVideos.map(video => (
                  <div id="eachFaveContainer" key={video._id}>
                    <div
                      style={{
                        background: `url(${
                          video.imageUrl
                        }) center center / cover no-repeat`,
                      }}
                      className="card"
                    >
                      <Link to={`/videos/${video.videoId}`}>
                        <h4 id="favesTitle">{video.name}</h4>
                      </Link>
                    </div>
                    <Mutation
                      mutation={UNLIKE_VIDEO}
                      variables={{ _id: video._id, username: username }}
                      refetchQueries={() => [
                        { query: GET_ALL_VIDEOS },
                        { query: GET_CURRENT_USER },
                      ]}
                      update={(cache, { data: { unlikeVideo } }) => {
                        const { getUserVideos } = cache.readQuery({
                          query: GET_USER_VIDEOS,
                          variables: { username },
                        });

                        cache.writeQuery({
                          query: GET_USER_VIDEOS,
                          variables: { username },
                          data: {
                            getUserVideos: getUserVideos.filter(
                              video => video._id !== unlikeVideo._id
                            ),
                          },
                        });
                      }}
                    >
                      {(unlikeVideo, attrs = {}) => (
                        <div>
                          <button className="button-primary">Update</button>
                          <p
                            className="delete-button"
                            onClick={() => this.handleDelete(unlikeVideo)}
                          >
                            {attrs.loading ? 'deleting...' : 'X'}
                          </p>
                        </div>
                      )}
                    </Mutation>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(UserVideos);
