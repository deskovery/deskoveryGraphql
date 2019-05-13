import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ videoId, name, likes }) => (
  <li>
    <Link to={`/videos/${videoId}`}>
      <h4>{name}</h4>
    </Link>
    <p>Likes: {likes}</p>
  </li>
);

export default SearchItem;
