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
    getAllQuizzes: async (root, args, { Video }) => {
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
    getUserQuizzes: async (root, { username }, { Video }) => {
      const userQuizzes = await Quiz.find({ username })
      return userQuizzes;
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
    likeQuiz: async (root, { _id, username }, { Quiz, User }) => {
      const quiz = await Quiz.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } }
      );
      return quiz;
    },
    unlikeQuiz: async (root, { _id, username }, { Quiz, User }) => {
      const quiz = await Quiz.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );
      return quiz;
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
    addNext: async (root, { name, gifs }, { Next }) => {
      const existingNext = await Next.findOne()
        .where('name')
        .equals(name);
      if (existingNext) {
        existingNext.gifs.push(gifs);
        return existingNext;
      } else {
        const newNext = await new Next({
          name,
          gifs
        }).save();
        return newNext;
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
