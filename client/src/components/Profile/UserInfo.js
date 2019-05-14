import React from 'react';

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
  <div className='App'>
    <br />
    <br />
    <h3>Your Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
  </div>
);

export default UserInfo;
