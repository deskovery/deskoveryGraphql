import { gql } from 'apollo-boost';

/* Video queries */
export const GET_ALL_VIDEOS = gql`
  query {
    getAllVideos {
      _id
      name
      imageUrl
      category
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
      category
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
    }
  }
`;

export const GET_QUIZ = gql`
  query($_id: ID!) {
    getQuiz(_id: $_id) {
      _id
      name
      gifs
    }
  }
`;

export const SEARCH_QUIZZES = gql`
  query($searchTerm: String) {
    searchQuizzes(searchTerm: $searchTerm) {
      _id
      name
      gifs
    }
  }
`;

/* Video Mutations */

export const ADD_VIDEO = gql`
  mutation(
    $name: String!
    $imageUrl: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String
  ) {
    addVideo(
      name: $name
      imageUrl: $imageUrl
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const LIKE_VIDEO = gql`
  mutation($_id: ID!, $username: String!) {
    likeVideo(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const UNLIKE_VIDEO = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeVideo(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const DELETE_USER_VIDEO = gql`
  mutation($_id: ID) {
    deleteUserVideo(_id: $_id) {
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

export const GET_USER_VIDEOS = gql`
  query($username: String!) {
    getUserVideos(username: $username) {
      _id
      name
      likes
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
