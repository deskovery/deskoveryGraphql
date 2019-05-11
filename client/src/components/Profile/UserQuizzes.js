import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_VIDEOS,
  GET_ALL_QUIZZES,
  GET_CURRENT_USER
} from '../../queries';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

class UserVideos extends React.Component {
  handleDelete = deleteUserQuiz => {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      deleteUserQuiz().then(({ data }) => {});
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
            <ul>
              <h3>Your Videos</h3>
              {!data.getUserVideos.length && (
                <strong>
                  <p>You have not favorited any videos, yet.  Go favorite some!</p>
                </strong>
              )}
              {data.getUserVideos.map(video => (
                <li key={video._id}>
                  <Link to={`/quizzes/${video._id}`}>
                    <p>{video.name}</p>
                  </Link>
                  <p style={{ marginBottom: '0' }}>Likes: {video.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_QUIZ}
                    variables={{ _id: quiz._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_QUIZZES },
                      { query: GET_CURRENT_USER }
                    ]}
                    update={(cache, { data: { deleteUserQuiz } }) => {
                      const { getUserQuizzes } = cache.readQuery({
                        query: GET_USER_QUIZZES,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_QUIZZES,
                        variables: { username },
                        data: {
                          getUserQuizzes: getUserQuizzes.filter(
                            quiz => quiz._id !== deleteUserQuiz._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserQuiz, attrs = {}) => (
                      <div>
                        <button className='button-primary'>Update</button>
                        <p
                          className='delete-button'
                          onClick={() => this.handleDelete(deleteUserQuiz)}
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

export default UserVideos;
