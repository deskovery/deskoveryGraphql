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
            $text: { $search: searchTerm },
          },
          {
            score: { $meta: 'textScore' },
          }
        ).sort({
          score: { $meta: 'textScore' },
        });
        return searchResults;
      } else {
        const videos = await Video.find().sort({
          likes: 'desc',
          createdDate: 'desc',
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
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Video',
        options: { retainNullValues: false },
      });
      // await User.findOne({
      //   username: currentUser.username
      // }).populate({
      //   path: 'journal',
      //   model: 'Journal',
      //   options: { retainNullValues: false }
      // });

      return user;
    },
    getUserJournal: async (root, { username }, { Journal }) => {
      const userJournal = await Journal.find({ username });
      return userJournal;
    },
    getUserVideos: async (root, { username }, { User }) => {
      const { favorites } = await User.findOne(
        { username },
        { favorites: true },
        { options: { retainNullValues: false } }
      );
      return favorites;
    },
  },
  Mutation: {
    addVideo: async (root, { name, gifs, videoId, imageUrl }, { Video }) => {
      const newVideo = await new Video({
        name,
        gifs,
        videoId,
        imageUrl,
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
      const video = await Video.findOne({ _id });
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
          imageUrl,
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
          gifs,
        }).save();
        return newVideo;
      }
    },
    addJournal: async (root, { title, text, username }, { Journal }) => {
      const newJournal = await new Journal({
        title,
        text,
        username,
      }).save();
      return newJournal;
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
        password,
      }).save();

      return { token: createToken(newUser, process.env.SECRET, '24hr') };
    },
  },
};
