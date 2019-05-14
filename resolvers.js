const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const http = require('http');
const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllVideos: async (root, args, { Video }) => {
      const allVideos = await Video.find();

      return allVideos;
    },
    getVideo: async (root, { _id }, { Video }) => {
      const video = await Video.findOne({ _id });
      return video;
    },
    searchVideos: async (root, { searchTerm }, { Video }) => {
      if (searchTerm) {
        const searchResults = await Video.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: 'textScore' }
          }
        ).sort({
          score: { $meta: 'textScore' }
        });
        return searchResults;
      } else {
        const videos = await Video.find().sort({
          likes: 'desc',
          createdDate: 'desc'
        });
        return videos;
      }
    },
    // getCaptureVideo: async(root,'', ''),

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: 'favorites',
        model: 'Video'
      });

      return user;
    },
    // More Videos
    // searchVideos: async (root, { searchTerm }, { Video }) => {
    //   if (searchTerm) {
    //     const searchResults = await Video.find(
    //       {
    //         $text: { $search: searchTerm }
    //       },
    //       {
    //         score: { $meta: 'textScore' }
    //       }
    //     ).sort({
    //       score: { $meta: 'textScore' }
    //     });
    //     return searchResults;
    //   } else {
    //     const videos = await Video.find();
    //     return videos;
    //   }
    // },
    getUserVideos: async (root, { username }, { User }) => {
      const { favorites } = await User.findOne(
        { username },
        { favorites: true }
      );
      return favorites;
    }
  },
  Mutation: {
    addVideo: async (root, { name, gifs, videoId }, { Video }) => {
      const newVideo = await new Video({
        name,
        gifs,
        videoId
      }).save();
      return newVideo;
    },
    likeVideo: async (root, { _id, username }, { Video, User }) => {
      try {
        const video = await Video.findOne({ videoId: _id });
        const user = await User.findOneAndUpdate(
          { username },
          { $push: { favorites: video } }
        );
      } catch (err) {
        console.error(err);
      }
      return video;
    },
    unlikeVideo: async (root, { _id, username }, { Video, User }) => {
      const video = await Video.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: video } }
      );
      return video;
    },
    deleteUserVideo: async (root, { _id }, { Video }) => {
      const video = await Video.findOneAndRemove({ _id });
      return video;
    },
    addVideoImage: async (root, { name, imageUrl }, { Video }) => {
      const existingVideo = await Video.findOne()
        .where('name')
        .equals(name);
      if (existingVideo) {
        existingVideo.imageUrl = imageUrl;
        return existingVideo;
      } else {
        const newVideo = await new Video({
          name,
          gifs
        }).save();
        return newVideo;
      }
    },
    addVideoGif: async (root, { name, gifs }, { Video }) => {
      const existingVideo = await Video.findOne()
        .where('name')
        .equals(name);
      if (existingVideo) {
        existingVideo.gifs.push(gifs);
        return existingVideo;
      } else {
        const newVideo = await new Video({
          name,
          gifs
        }).save();
        return newVideo;
      }
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      } else {
        return { token: createToken(user, process.env.SECRET, '24hr') };
      }
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return { token: createToken(newUser, process.env.SECRET, '24hr') };
    }
  }
};
