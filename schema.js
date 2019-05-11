exports.typeDefs = `

type Video {
  _id: ID
  name: String!
  gifs: [String]
  likes: Int
  username: String
  videoId: String!
}

type User {
  _id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favorites: [Video]
}

type Next {
  _id: ID
  name: String @unique
  video: [Video]
  gifs: [String]
}

type Quiz {
  _id: ID
  name: String! @unique
  username: String
  likes: Int
  gifs: [String]
  next: [Next]

}


type Query {
  getAllVideos: [Video]
  getVideo(_id: ID): Video
  searchVideos(searchTerm: String):[Video]

  getAllQuizzes: [Quiz]
  getQuiz: Quiz
  searchQuizzes(searchTerm: String): [Quiz]

  getQuizNext(name: String!): [Next]

  getCurrentUser: User
  getUserVideos(username: String!): [Video]
}

type Token {
  token: String!
}

type Mutation {
  addVideo(name: String!, gifs: [String], videoId: String!): Video

  deleteUserQuiz(_id: ID!): Quiz


  addQuiz(name: String!, gifs: String!): Quiz

  addVideoGif(name: String!, gifs: String!): Video

  likeVideo(_id: ID!, username: String!): Video
  unlikeVideo(_id: ID!, username: String!): Video

  signinUser(username: String!, password: String!): Token

  signupUser(username: String!, email: String!, password: String!): Token
}

`;
