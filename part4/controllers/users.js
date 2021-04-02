const User = require('../models/user');
const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const user = new User(request.body);
  const result = await user.save(); // Password is hashed pre save, defined in user model
  response.status(201).json(result);

});
module.exports = usersRouter;