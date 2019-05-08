import React, { Component } from 'react';

import withSession from '../withSession';
import { Mutation } from 'react-apollo';
import { LIKE_QUIZ, GET_QUIZ, UNLIKE_QUIZ } from '../../queries';

class LikeQuiz extends Component {
  state = {
    username: '',
    liked: false
  };

  handleClick = (likeQuiz, unlikeQuiz) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.handleLike(likeQuiz, unlikeQuiz)
    );
  };

  handleLike = (likeQuiz, unlikeQuiz) => {
    if (this.state.liked) {
      likeQuiz().then(async ({ data }) => {
        await this.props.refetch();
      });
    } else {
      // unlike Quiz mutation
      unlikeQuiz().then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({
        liked: prevLiked,
        username
      });
    }
  }

  updateLike = (cache, { data: { likeQuiz } }) => {
    const { _id } = this.props;
    const { getQuiz } = cache.readQuery({
      query: GET_QUIZ,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_QUIZ,
      variables: { _id },
      data: {
        getQuiz: { ...getQuiz, likes: likeQuiz.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeQuiz } }) => {
    const { _id } = this.props;
    const { getQuiz } = cache.readQuery({
      query: GET_QUIZ,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_QUIZ,
      variables: { _id },
      data: {
        getQuiz: { ...getQuiz, likes: unlikeQuiz.likes - 1 }
      }
    });
  };

  render() {
    const { liked, username } = this.state;
    const { _id } = this.props;
    return (
      <Mutation
        mutation={UNLIKE_QUIZ}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeQuiz => (
          <Mutation
            mutation={LIKE_QUIZ}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeQuiz => {
              return (
                username && (
                  <button
                    onClick={() => this.handleClick(likeQuiz, unlikeQuiz)}
                    className='like-button'
                  >
                    {liked ? 'Unlike' : 'Like'}
                  </button>
                )
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeQuiz);
