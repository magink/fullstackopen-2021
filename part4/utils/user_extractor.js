const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UserExtractor = async (request, response, next) => {
  if(request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.user = await User.findById(decodedToken.id);
  }
  next();
};
module.exports = UserExtractor;