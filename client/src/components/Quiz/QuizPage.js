import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_QUIZ } from '../../queries';
import LikeQuiz from './LikeQuiz';
import Spinner from '../Spinner';

const QuizPage = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query query={GET_QUIZ} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <div>Error</div>;

        return (
          <div className='App'>
            <div
              style={{
                background: `url(${
                  data.getQuiz.gifs[0]
                }) center center / cover no-repeat`
              }}
              className='video-image'
            />
            <div className='video'>
              <div className='video-header'>
                <h2 className='video-name'>
                  <strong>{data.getQuiz.name}</strong>
                </h2>
                <h5>
                  <strong>{data.getQuiz.name}</strong>
                </h5>
                <p>
                  Created by <strong>{data.getQuiz.username}</strong>
                </p>
                <p>
                  {data.getQuiz.likes}{' '}
                  <span role='img' aria-label='heart'>
                    ❤️
                  </span>
                </p>
              </div>
              <blockquote className='video-description'>
                {data.getQuiz.name}
              </blockquote>
              <h3 className='video-instructions__title'>Instructions</h3>
              <div
                className='video-instructions'
                dangerouslySetInnerHTML={{
                  __html: data.getQuiz.name
                }}
              />
              <LikeQuiz _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(QuizPage);
