import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import { SEARCH_VIDEOS, SEARCH_QUIZZES } from '../../queries';
import SearchItem from './SearchItem';

class Search extends React.Component {
  state = {
    searchResults: []
  };
  handleChange = ({ searchQuizzes }) => {
    this.setState({
      searchResults: searchQuizzes
    });
  };
  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className='App'>
            <input
              type='search'
              className='search'
              placeholder='Search for Quizzes'
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_QUIZZES,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(quiz => (
                <SearchItem key={quiz._id} {...quiz} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
