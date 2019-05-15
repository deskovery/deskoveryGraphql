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

import Profile from './components/Profile/Profile';
import { Capture } from './components/momentCapture';
import userHome from './components/user-home';
import Quiz from './components/Quiz/quizMain';
import Favorites from './components/Favorites/favorites';
import Landingpage from './components/Landingpage';
import FactCarousel from './components/FactCarousel';

// Importing Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? `https://desk0very.herokuapp.com/graphql`
      : `http://localhost:4444/graphql`,
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
        <Route exact path="/" component={Landingpage} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/about" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/capture" component={Capture} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/facts" component={FactCarousel} />
        {/* <Route path="/videos/" component={userHome} /> */}
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/videos/:_id" component={userHome} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Redirect to="/" />
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
