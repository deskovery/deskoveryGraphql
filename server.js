// Bring in Express.
const express = require("express");
// Initializes app
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Expose-Headers", "Content-Length");
  next();
});

// connect your backend to mlab
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up JWT authentication middleware
// app.use(async (req, res, next) => {
//   const token = await req.headers['authorization'];
//   if (token !== 'null') {
//     try {
//       const currentUser = await jwt.verify(token, process.env.SECRET);
//       req.currentUser = currentUser;
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   next();
// });

// allows to use different variables
require("dotenv").config({ path: "variables.env" });

const Video = require("./models/Video");
const User = require("./models/User");

// GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Creates graphql schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Creates graphiql
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Connects schemas
app.use(
  "/graphql",
  express.json(),
  graphqlExpress(({ currentUser }) => ({
    cors: false,
    schema,
    context: {
      Video,
      User,
      currentUser
    }
  }))
);

// api routes
app.use("/api", require("./api/index"));
app.use(express.static(path.join(__dirname, "..", "public")));

// actually connects to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Set up server.
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server tuning in on PORT ${PORT}`);
});
