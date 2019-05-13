import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_VIDEOS,
  GET_ALL_VIDEOS,
  DELETE_USER_VIDEO,
  GET_CURRENT_USER
} from '../../queries';
import { Link } from 'react-router-dom';
import { Redirect, History } from 'react-router-dom';
import { withRouter } from 'react-router';
import Spinner from '../Spinner';

class UserVideos extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete = deleteUserVideo => {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      deleteUserVideo().then(({ data }) => {});
    }
  };

  handleClick = id => {
    console.log(id, 'is id of UserVideo');
    this.props.history.push({
      pathname: '/video',
      state: {
        video: id
      }
    });
  };

  render() {
    const { username } = this.props;
    console.log(this.props, ' is props inside the render');
    return (
      <Query query={GET_USER_VIDEOS} variables={{ username }}>
        {({ data, loading, error }) => {
          console.log('FAVORITES', data, error);
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          return (
            <ul>
              <h3>Your Videos</h3>
              {!data.getUserVideos.length && (
                <strong>
                  <p>
                    You have not favorited any videos, yet. Go favorite some!
                  </p>
                </strong>
              )}
              {data.getUserVideos.map(video => (
                <li key={video._id}>
                  <p onClick={e => this.handleClick(video.videoId)}>
                    {video.name}
                  </p>
                  <p style={{ marginBottom: '0' }}>Likes: {video.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_VIDEO}
                    variables={{ _id: video._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_VIDEOS },
                      { query: GET_CURRENT_USER }
                    ]}
                    update={(cache, { data: { deleteUserVideo } }) => {
                      const { getUserVideos } = cache.readQuery({
                        query: GET_USER_VIDEOS,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_VIDEOS,
                        variables: { username },
                        data: {
                          getUserVideos: getUserVideos.filter(
                            video => video._id !== deleteUserVideo._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserVideo, attrs = {}) => (
                      <div>
                        <button className='button-primary'>Update</button>
                        <p
                          className='delete-button'
                          onClick={() => this.handleDelete(deleteUserVideo)}
                        >
                          {attrs.loading ? 'deleting...' : 'X'}
                        </p>
                      </div>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(UserVideos);
