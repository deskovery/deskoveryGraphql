const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
  username: {
    type: String
  }
});

JournalSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Journal', JournalSchema);
