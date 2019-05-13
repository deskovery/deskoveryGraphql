import React from 'react';
import UserInfo from './UserInfo';
import UserVideos from './UserVideos';
import withAuth from '../withAuth';

class Profile extends React.Component {
  render() {
    console.log(this.props, ' is props inside Profile');
    return (
      <div className='App'>
        <UserInfo session={this.props.session} />
        <UserVideos
          username={this.props.session.getCurrentUser.username}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
