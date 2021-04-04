const User = require('../models/user');
const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1, id: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { password, username, name } = request.body;

  if (!password || password.length < 4) {
    throw new Error('Incorrect password credentials');
  }

  const hashedPassword = await User.hashPassword(password);
  const user = new User({
    username: username,
    name: name,
    hashedPassword,
  });
  const result = await user.save();
  response.status(201).json(result);

});
module.exports = usersRouter;