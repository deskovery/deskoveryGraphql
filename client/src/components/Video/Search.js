import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import { SEARCH_VIDEOS} from '../../queries';
import SearchItem from './SearchItem';

class Search extends React.Component {
  state = {
    searchResults: []
  };
  handleChange = ({ searchVideos }) => {
    this.setState({
      searchResults: searchVideos
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
              placeholder='Search for Live Streams'
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_VIDEOS,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(video => (
                <SearchItem key={video._id} {...video} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
