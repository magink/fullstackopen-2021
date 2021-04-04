const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, userId } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken) {
    const e = new Error('token missing or invalid');
    e.name = 'UnauthorizedError';
    throw e;
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const exist = await Blog.findByIdAndDelete(request.params.id);
  exist ? response.status(200).json(exist) : response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body;
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
    runValidators: true,
  });
  response.status(200).end();
});

module.exports = blogsRouter;