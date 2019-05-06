import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
  <div className='App'>
    <h3>User Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
    <ul>
      <h3>{session.getCurrentUser.username}'s Favorites</h3>
      {session.getCurrentUser.favorites.map(favorite => (
        <li key={favorite._id}>
          <Link to={`/videos/${favorite._id}`}>
            <p>{favorite.name}</p>
          </Link>
        </li>
      ))}
      {!session.getCurrentUser.favorites.length && (
        <p>
          <strong>You currently have no favorites. Go add some!</strong>
        </p>
      )}
    </ul>
  </div>
);

export default UserInfo;
