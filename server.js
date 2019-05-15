// Bring in Express.
const express = require('express');
// Initializes app
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Expose-Headers', 'Content-Length');
  next();
});

// connect your backend to mlab
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = await req.headers['authorization'];
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// allows to use different variables
require('dotenv').config({ path: 'variables.env' });

const Video = require('./models/Video');
const User = require('./models/User');
const Quiz = require('./models/Quiz');
const Next = require('./models/Next');
const Journal = require('./models/Journal');

// GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Creates graphql schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Creates graphiql
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connects schemas
app.use(
  '/graphql',
  express.json(),
  graphqlExpress(({ currentUser }) => ({
    cors: false,
    schema,
    context: {
      Video,
      User,
      Quiz,
      Next,
      Journal,
      currentUser
    }
  }))
);

// api routes
app.use('/api', require('./api/index'));
app.use('/videos', require('./videos/index'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// actually connects to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set up server.
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server tuning in on PORT ${PORT}`);
});
