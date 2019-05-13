import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const VideoItem = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default ({ _id, username, name, likes }) => (
  <VideoItem
    // style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
    className='card'
  >
    <div className='card-text'>
      <Link to={`/videos/${_id}`}>
        <h4>{name}</h4>
        <h4>Likes: {likes}</h4>
        <h4>{username}</h4>
      </Link>
    </div>
  </VideoItem>
);
