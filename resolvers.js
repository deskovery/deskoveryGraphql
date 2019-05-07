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
      const allVideos = await Video.find().sort({
        createdDate: 'desc'
      });

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
    getUserVideos: async (root, { username }, { Video }) => {
      const userVideos = await Video.find({ username }).sort({
        createdDate: 'desc'
      });
      return userVideos;
    },
    // getCaptureVideo: async(root,'', ''),

    getAllUsers: async (root, args, { User }) => {
      const allUsers = await User.find().sort({
        joinDate: 'desc'
      });

      return allUsers;
    },

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

    getAllQuizzes: async (root, args, { Quiz }) => {
      const allQuizzes = await Quiz.find()


      return allQuizzes;
    },



  },
  Mutation: {
    addVideo: async (
      root,
      { name, imageUrl, description, category, instructions, username },
      { Video }
    ) => {
      const newVideo = await new Video({
        name,
        imageUrl,
        description,
        category,
        instructions,
        username
      }).save();
      return newVideo;
    },
    likeVideo: async (root, { _id, username }, { Video, User }) => {
      const video = await Video.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } }
      );
      return video;
    },
    unlikeVideo: async (root, { _id, username }, { Video, User }) => {
      const video = await Video.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );
      return video;
    },
    deleteUserVideo: async (root, { _id }, { Video }) => {
      const video = await Video.findOneAndRemove({ _id });
      return video;
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
        return { token: createToken(user, process.env.SECRET, '1hr') };
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

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },

    addQuiz: async (
      root,
      { name, gifs },
      { Quiz }
    ) => {
      const newQuiz = await new Quiz({
        name,
        gifs
      }).save();
      return newQuiz;
    }


  }
};
