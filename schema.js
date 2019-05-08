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
  favorites: [Quiz]
}

type Next {
  _id: ID
  name: String @unique
  gifs: [String!]
}

type Quiz {
  _id: ID
  name: String! @unique
  username: String
  likes: Int
  gifs: [String!]
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
  getUserQuizzes(username: String!): [Quiz]
}

type Token {
  token: String!
}

type Mutation {
  addVideo(name: String!, imageUrl: String!, description: String!, category: String!, instructions: String!, username: String): Video

  deleteUserQuiz(_id: ID!): Quiz
  likeQuiz(_id: ID!, username: String!): Quiz
  unlikeQuiz(_id: ID!, username: String!): Quiz

  addQuiz(name: String!, gifs: String!): Quiz

  addNext(name: String!, gifs: String!): Next


  signinUser(username: String!, password: String!): Token

  signupUser(username: String!, email: String!, password: String!): Token
}

`;
