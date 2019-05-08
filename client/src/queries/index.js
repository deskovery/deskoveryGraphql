import { gql } from 'apollo-boost';

/* Video queries */
export const GET_ALL_VIDEOS = gql`
  query {
    getAllVideos {
      _id
      name
      imageUrl
      path
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const GET_VIDEO = gql`
  query($_id: ID!) {
    getVideo(_id: $_id) {
      _id
      name
      imageUrl
      path
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const SEARCH_VIDEOS = gql`
  query($searchTerm: String) {
    searchVideos(searchTerm: $searchTerm) {
      _id
      name
      imageUrl
      likes
    }
  }
`;

/* Quiz queries */
export const GET_ALL_QUIZZES = gql`
  query {
    getAllQuizzes {
      _id
      name
      gifs
      next
      username
      likes
    }
  }
`;

export const GET_QUIZ = gql`
  query($_id: ID!) {
    getQuiz(_id: $_id) {
      _id
      name
      gifs
      username
      next
      likes
    }
  }
`;

export const SEARCH_QUIZZES = gql`
  query($searchTerm: String) {
    searchQuizzes(searchTerm: $searchTerm) {
      _id
      name
      gifs
      username
      next
      likes
    }
  }
`;

/* Video Mutations */

export const ADD_VIDEO = gql`
  mutation(
    $name: String!
    $imageUrl: String!
    $description: String!
    $path: String!
    $instructions: String!
    $username: String
  ) {
    addVideo(
      name: $name
      imageUrl: $imageUrl
      description: $description
      path: $path
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      path
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const LIKE_QUIZ = gql`
  mutation($_id: ID!, $username: String!) {
    likeQuiz(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const UNLIKE_QUIZ = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeQuiz(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const DELETE_USER_QUIZ = gql`
  mutation($_id: ID) {
    deleteUserQuiz(_id: $_id) {
      _id
    }
  }
`;

/* Quiz Mutations */

export const ADD_QUIZ = gql`
  mutation($name: String!, $gifs: [String!]) {
    addQuiz(name: $name, gifs: $gifs) {
      _id
      name
      gifs
      username
      likes

    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        name
      }
    }
  }
`;

export const GET_USER_QUIZZES = gql`
  query($username: String!) {
    getUserQuizzes(username: $username) {
      _id
      name
      likes
      username
      gifs
    }
  }
`;

/* User Mutations */

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
