import React from 'react';
import UserInfo from './UserInfo';
import UserQuizzes from './UserQuizzes';
import withAuth from '../withAuth';

const Profile = ({ session }) => (
  <div className='App'>
    <UserInfo session={session} />
    <UserQuizzes username={session.getCurrentUser.username} />
  </div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);
