const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NextSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  gifs: {
    type: [String],
    required: true
  },
  video: {
    type: [Schema.Types.ObjectId],
    ref: 'Video'
  }

});

NextSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Next', NextSchema);
