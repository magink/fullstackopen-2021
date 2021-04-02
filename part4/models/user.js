const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]

});

UserSchema.plugin(uniqueValidator);

/**
 * Hash the password before save to database
 */
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) { // Don't hash the hash
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


UserSchema.statics.comparePassword = async (candidatePassword, hash) =>
  await bcrypt.compare(candidatePassword, hash);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(      );
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;