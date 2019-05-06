import React from 'react';
import UserInfo from './UserInfo';
import UserVideos from './UserVideos';
import withAuth from '../withAuth';

const Profile = ({ session }) => (
  <div className='App'>
    <UserInfo session={session} />
    <UserVideos username={session.getCurrentUser.username} />
  </div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);
