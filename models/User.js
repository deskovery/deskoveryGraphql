const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [
      {
        _id: Schema.Types.ObjectId,
        name: String,
        gifs: [String],
        likes: Number,
        videoId: String
      }
    ],
    ref: 'Video'
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
