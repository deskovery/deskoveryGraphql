import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import Search from './components/Video/Search';
import AddVideo from './components/Video/AddVideo';
import Profile from './components/Profile/Profile';
import VideoPage from './components/Video/VideoPage';
import QuizPage from './components/Quiz/QuizPage';
import { Capture } from './components/momentCapture';
import userHome from './components/user-home';

// Importing Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: `http://localhost:4444/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log(networkError);
    }
  },
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/capture" component={Capture} />
        <Route path="/user" component={userHome} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route
          path="/video/add"
          render={() => <AddVideo session={session} />}
        />
        <Route path="/quizzes/:_id" component={QuizPage} />
        <Route path="/videos/:_id" component={VideoPage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        {/* <Redirect to='/' /> */}
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
