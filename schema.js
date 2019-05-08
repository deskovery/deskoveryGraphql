exports.typeDefs = `

type Video {
  _id: ID
  name: String!
  imageUrl: String!
  category: String!
  description: String!
  instructions: String!
  createdDate: String
  likes: Int
  username: String
}

type User {
  _id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favorites: [Video]
}

type Quiz {
  _id: ID
  name: String! @unique
  gifs: [String!]
  next: [Quiz]
}


type Query {
  getAllVideos: [Video]
  getVideo(_id: ID): Video
  searchVideos(searchTerm: String):[Video]

  getAllQuizzes: [Quiz]
  getQuiz: Quiz
  searchQuizzes(searchTerm: String): [Quiz]

  getCurrentUser: User
  getUserVideos(username: String!): [Video]
}

type Token {
  token: String!
}

type Mutation {
  addVideo(name: String!, imageUrl: String!, description: String!, category: String!, instructions: String!, username: String): Video

  deleteUserVideo(_id: ID): Video
  likeVideo(_id: ID!, username: String!): Video
  unlikeVideo(_id: ID!, username: String!): Video

  addQuiz(name: String!, gifs: String!): Quiz


  signinUser(username: String!, password: String!): Token

  signupUser(username: String!, email: String!, password: String!): Token
}

`;
