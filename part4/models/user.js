const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

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
  hashedPassword: {
    type: String,
    required: true,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]

});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.comparePassword = async (candidatePassword, hash) =>
  await bcrypt.compare(candidatePassword, hash);

UserSchema.statics.hashPassword = async (password) =>
  await bcrypt.hash(password, SALT_WORK_FACTOR);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(      );
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
const User = mongoose.model('User', UserSchema);



module.exports = User;