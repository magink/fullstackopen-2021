const Blog = require('../models/blog');
const blogsRouter = require('express').Router();
const SALT_WORK_FACTOR = 10;


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
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