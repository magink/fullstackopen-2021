const Blog = require('../models/blog');
const blogsRouter = require('express').Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { user, body: { title, author, url, likes } } = request;

  if(!user) {
    const e = new Error('token missing or invalid');
    e.name = 'UnauthorizedError';
    throw e;
  }

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
  const { user, params: { id } } = request;
  const blogToRemove = await Blog.findById(id);
  if(!user) {
    const e = new Error('user token is not provided');
    e.name = 'MissingToken';
    throw e;
  }
  if (!blogToRemove) {
    const e = new Error('blog is not available');
    e.name = 'MissingResource';
    throw e;
  }
  if(user.id.toString() !== blogToRemove.user.toString()) {
    const e = new Error('user is not authorized to delete this blog');
    e.name = 'UnauthorizedError';
    throw e;
  }
  await Blog.deleteOne(blogToRemove);

  user.blogs = user.blogs.filter(blogId => {
    return blogId.toString() !== blogToRemove._id.toString();
  });
  await user.save();

  response.status(200).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { user, params: { id }, body: updatedBlog } = request;
  const blog = await Blog.findById(id);
  if(!user) {
    const e = new Error('user token is not provided');
    e.name = 'MissingToken';
    throw e;
  }
  if (!blog) {
    const e = new Error('blog is not available');
    e.name = 'MissingResource';
    throw e;
  }
  if(user._id.toString() !== blog.user.toString()) {
    const e = new Error('user is not authorized to update this blog');
    e.name = 'UnauthorizedError';
    throw e;
  }

  const res = await Blog.findOneAndUpdate({ _id: blog._id }, updatedBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.status(200).end();
});

module.exports = blogsRouter;