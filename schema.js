exports.typeDefs = `

type Video {
  _id: ID
  name: String!
  gifs: [String]
  likes: Int
  imageUrl: String
  videoId: String!
}

type Journal {
  _id: ID
  title: String
  text: String
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


  getQuizNext(name: String!): [Next]

  getCurrentUser: User
  getUserVideos(username: String!): [Video]
  getUserJournal(username: String!): Journal
}

type Token {
  token: String!
}

type Mutation {
  addVideo(name: String!, gifs: [String], videoId: String!, imageUrl: String!): Video
  addVideoGif(name: String!, gifs: String!): Video
  addVideoImage(name: String!, imageUrl: String!): Video
  addJournal(title: String, text: String, username: String): Journal

  deleteUserVideo(_id: ID!): Video


  likeVideo(_id: ID!, username: String!): Video
  unlikeVideo(_id: ID!, username: String!): Video

  signinUser(username: String!, password: String!): Token

  signupUser(username: String!, email: String!, password: String!): Token
}

`;
