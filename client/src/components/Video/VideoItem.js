import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const VideoItem = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default ({ _id, imageUrl, name, path }) => (
  <VideoItem
    style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
    className='card'
  >
    <span className={path}>{path}</span>
    <div className='card-text'>
      <Link to={`/videos/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </VideoItem>
);
