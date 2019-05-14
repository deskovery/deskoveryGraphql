import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ videoId, name, likes, imageUrl }) => (
  <li>
    <Link to={`/videos/${videoId}`}>
      <h4>{name}</h4>
      <img src={imageUrl} alt='pic of vid' />
    </Link>
    <p>Likes: {likes}</p>
  </li>
);

export default SearchItem;
