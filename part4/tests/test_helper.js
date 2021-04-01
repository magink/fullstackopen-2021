const Blog = require('../models/blog');

const InitialBlogs = [
  {
    title: 'Why users care about how you write code',
    author: 'Kent C Dodds',
    url: 'https://kentcdodds.com/blog/why-users-care-about-how-you-write-code',
    likes: 78
  },
  {
    title: 'How to Modify Nodes in an Abstract Syntax Tree',
    author: 'Jason Lengstorf',
    url: 'https://css-tricks.com/how-to-modify-nodes-in-an-abstract-syntax-tree/',
    likes: 34
  },
  {
    title: 'Model-Based Testing in React with State Machines',
    author: 'David Khourshid',
    url: 'https://css-tricks.com/model-based-testing-in-react-with-state-machines/',
    likes: 54
  }
];
const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Will be removed',
    author: 'Nothing',
    url: 'https://www.wikipedia.org/',
  });
  await blog.save();
  await blog.remove();
  return blog.id.toString();
};

module.exports = {
  InitialBlogs,
  blogsInDB,
  nonExistingId
};