const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

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

const InitialUsers = [
  {
    username: 'user123',
    name: 'Morgan McCormacc',
    password: 'abcd1234'
  },
  {
    username: 'total_destroyah',
    name: 'Sumgam Nohomi',
    password: 'terminatorX'
  },
  {
    username: 'coconut-hippy',
    name: 'Lisa Sorova',
    password: 'marcus-the-dog'
  },
  {
    username: 'Kenta7766',
    name: 'Kenta Andersson',
    password: '1010aa1010'
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

const randomExistingUser = async () => {
  const users = await usersInDB();
  const user = users[Math.floor(Math.random() * users.length)];
  return user;
};

const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: 'Will be removed',
    author: 'Nothing',
    url: 'https://www.wikipedia.org/',
  });
  await blog.save();
  await blog.remove();
  return blog.id.toString();
};
const setupTestUsers = async () => {
  await User.deleteMany({});
  const hashedUsers = InitialUsers.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const hashedUser =  new User({
      username: user.username,
      name: user.name,
      hashedPassword
    });
    return hashedUser.save();
  });
  await Promise.all(hashedUsers);
};

module.exports = {
  InitialBlogs,
  InitialUsers,
  blogsInDB,
  usersInDB,
  nonExistingBlogId,
  randomExistingUser,
  setupTestUsers
};