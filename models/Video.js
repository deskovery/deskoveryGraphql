const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gifs: {
    type: [String],
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String
  },
  videoId: {
    type: String
  }
});

VideoSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Video', VideoSchema);
