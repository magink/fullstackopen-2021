const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.InitialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogs.map(blog => blog.save());
  await Promise.all(promiseArray);

});

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs are the correct amount', async () => {
    const { body } = await api.get('/api/blogs');
    expect(body).toHaveLength(helper.InitialBlogs.length);
  });

  test('blogs have a property named id', async () => {
    const { body: { 0: id } } = await api.get('/api/blogs');
    expect(id).toBeDefined();
  });
});

describe('POST /api/blogs', () => {

  test('a valid blog is added', async () => {
    const validBlogObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      likes: 54
    };

    await api
      .post('/api/blogs')
      .send(validBlogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { body: blogs } = await api.get('/api/blogs');
    expect(blogs).toHaveLength(helper.InitialBlogs.length + 1);
    const blogTitles = blogs.map(blog => blog.title);
    expect(blogTitles).toContain(validBlogObject.title);
  });

  test('added blog property "likes" default to 0 if missing', async () => {
    const missingLikesObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks'
    };

    await api
      .post('/api/blogs')
      .send(missingLikesObject)
      .expect(201);

    const { body: blogs } = await api.get('/api/blogs');
    expect(blogs[blogs.length - 1].likes).toEqual(0);

  });

});

describe('Blogs property', () => {

});

afterAll(() => {
  mongoose.connection.close();
});