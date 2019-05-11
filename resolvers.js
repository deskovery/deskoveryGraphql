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
    // getCaptureVideo: async(root,'', ''),

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: 'favorites',
        model: 'Quiz'
      });

      return user;
    },
    // Get Quizzes
    getAllQuizzes: async (root, args, { Quiz }) => {
      const allQuizzes = await Quiz.find();

      return allQuizzes;
    },
    getQuiz: async (root, { _id }, { Quiz }) => {
      const quiz = await Quiz.findOne({ _id });
      return quiz;
    },
    searchQuizzes: async (root, { searchTerm }, { Quiz }) => {
      if (searchTerm) {
        const searchResults = await Quiz.find(
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
        const quizzes = await Quiz.find();
        return quizzes;
      }
    },
    getUserVideos: async (root, { username }, { Video }) => {
      const userVideos = await Video.find({ username });
      return userVideos;
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
      const video = await Video.findOneAndUpdate({ _id });
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
    deleteUserQuiz: async (root, { _id }, { Quiz }) => {
      const quiz = await Quiz.findOneAndRemove({ _id });
      return quiz;
    },
    addQuiz: async (root, { name, gifs }, { Quiz }) => {
      const existingQuiz = await Quiz.findOne()
        .where('name')
        .equals(name);
      if (existingQuiz) {
        existingQuiz.gifs.push(gifs);
        return existingQuiz;
      } else {
        const newQuiz = await new Quiz({
          name,
          gifs
        }).save();
        return newQuiz;
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
    }
  }
};
