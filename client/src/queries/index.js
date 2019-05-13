import { gql } from 'apollo-boost';

/* Video queries */
export const GET_ALL_VIDEOS = gql`
  query {
    getAllVideos {
      _id
      name
      gifs
      likes
      username
    }
  }
`;

export const GET_VIDEO = gql`
  query($_id: ID!) {
    getVideo(_id: $_id) {
      _id
      gifs
      likes
      name
    }
  }
`;

export const SEARCH_VIDEOS = gql`
  query($searchTerm: String) {
    searchVideos(searchTerm: $searchTerm) {
      _id
      name
      likes
      videoId
    }
  }
`;

/* Video Mutations */

export const ADD_VIDEO = gql`
  mutation($name: String!, $gifs: String, $videoId: String) {
    addVideo(name: $name, gifs: $gifs, videoId: $videoId) {
      _id
      name
      gifs
      videoId
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

export const ADD_VIDEO_GIF = gql`
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
        videoId
        gifs
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
      videoId
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
