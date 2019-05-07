const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gifs: {
    type: String,
    required: true
  }

});

QuizSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Quiz', QuizSchema);
