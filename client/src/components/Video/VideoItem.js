import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const VideoItem = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default ({ _id, name, likes, imageUrl, videoId }) => (
  <VideoItem
    style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
    className='card'
  >
    <div className='card-text'>
      <Link to={`/videos/${videoId}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </VideoItem>
);
