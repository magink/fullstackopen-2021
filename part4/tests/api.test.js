/*
Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url.
Verify that the blog list application returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

Notice that you will have to make similar changes to the code that were made in the material,
like defining the test environment so that you can write tests that use their own separate database.
*/

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.InitialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.InitialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.InitialBlogs[2]);
  await blogObject.save();

});

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs are the correct amount', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.InitialBlogs.length);
  });

  test('blogs have a property named id', async () => {
    const { body: { 0: id } } = await api.get('/api/blogs');
    expect(id).toBeDefined();
  });
});
afterAll(() => {
  mongoose.connection.close();
});