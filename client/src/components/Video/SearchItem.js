import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ videoId, name, imageUrl }) => (
  <li>
    <Link to={`/videos/${videoId}`}>
      <h4>{name}</h4>
    </Link>
  </li>
);

export default SearchItem;
