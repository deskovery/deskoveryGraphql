// import React, { Component } from 'react';

// import withSession from '../withSession';
// import { Mutation } from 'react-apollo';
// import { GET_VIDEO } from '../../queries';

// class LikeVideo extends Component {
//   state = {
//     username: '',
//     liked: false
//   };

//   handleClick = (likeVideo, unlikeVideo) => {
//     this.setState(
//       prevState => ({
//         liked: !prevState.liked
//       }),
//       () => this.handleLike(likeVideo, unlikeVideo)
//     );
//   };

//   handleLike = (likeVideo, unlikeVideo) => {
//     if (this.state.liked) {
//       likeVideo().then(async ({ data }) => {
//         await this.props.refetch();
//       });
//     } else {
//       // unlike Video mutation
//       unlikeVideo().then(async ({ data }) => {
//         await this.props.refetch();
//       });
//     }
//   };

//   componentDidMount() {
//     if (this.props.session.getCurrentUser) {
//       const { username, favorites } = this.props.session.getCurrentUser;
//       const { _id } = this.props;
//       const prevLiked =
//         favorites.findIndex(favorite => favorite._id === _id) > -1;
//       this.setState({
//         liked: prevLiked,
//         username
//       });
//     }
//   }

//   updateLike = (cache, { data: { likeVideo } }) => {
//     const { _id } = this.props;
//     const { getVideo } = cache.readQuery({
//       query: GET_VIDEO,
//       variables: { _id }
//     });

//     cache.writeQuery({
//       query: GET_VIDEO,
//       variables: { _id },
//       data: {
//         getVideo: { ...getVideo, likes: likeVideo.likes + 1 }
//       }
//     });
//   };

//   updateUnlike = (cache, { data: { unlikeVideo } }) => {
//     const { _id } = this.props;
//     const { getVideo } = cache.readQuery({
//       query: GET_VIDEO,
//       variables: { _id }
//     });

//     cache.writeQuery({
//       query: GET_VIDEO,
//       variables: { _id },
//       data: {
//         getVideo: { ...getVideo, likes: unlikeVideo.likes - 1 }
//       }
//     });
//   };

//   render() {
//     const { liked, username } = this.state;
//     const { _id } = this.props;
//     return (
//       <Mutation
//         mutation={UNLIKE_VIDEO}
//         variables={{ _id, username }}
//         update={this.updateUnlike}
//       >
//         {unlikeVideo => (
//           <Mutation
//             mutation={LIKE_VIDEO}
//             variables={{ _id, username }}
//             update={this.updateLike}
//           >
//             {likeVideo => {
//               return (
//                 username && (
//                   <button
//                     onClick={() => this.handleClick(likeVideo, unlikeVideo)}
//                     className='like-button'
//                   >
//                     {liked ? 'Unlike' : 'Like'}
//                   </button>
//                 )
//               );
//             }}
//           </Mutation>
//         )}
//       </Mutation>
//     );
//   }
// }

// export default withSession(LikeVideo);
