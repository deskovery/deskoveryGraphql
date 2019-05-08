import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_QUIZZES,
  DELETE_USER_QUIZ,
  GET_ALL_QUIZZES,
  GET_CURRENT_USER
} from '../../queries';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

class UserQuizzes extends React.Component {
  handleDelete = deleteUserQuiz => {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      deleteUserQuiz().then(({ data }) => {});
    }
  };

  render() {
    const { username } = this.props;
    return (
      <Query query={GET_USER_QUIZZES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;

          return (
            <ul>
              <h3>Your Quizzes</h3>
              {!data.getUserQuizzes.length && (
                <strong>
                  <p>You have not taken any quizzes yet.</p>
                </strong>
              )}
              {data.getUserQuizzes.map(quiz => (
                <li key={quiz._id}>
                  <Link to={`/quizzes/${quiz._id}`}>
                    <p>{quiz.name}</p>
                  </Link>
                  <p style={{ marginBottom: '0' }}>Likes: {quiz.likes}</p>
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

export default UserQuizzes;
