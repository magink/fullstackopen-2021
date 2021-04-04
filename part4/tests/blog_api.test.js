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
  beforeAll(async () => {
    await helper.setupTestUsers();
  });

  test('a valid blog is added', async () => {
    const user = await helper.randomExistingUser();
    const validBlogObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      likes: 54,
      userId: user.id
    };
    await api
      .post('/api/blogs')
      .send(validBlogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDB();
    expect(blogs).toHaveLength(helper.InitialBlogs.length + 1);
    const blogTitles = blogs.map(blog => blog.title);
    expect(blogTitles).toContain(validBlogObject.title);
  });
  test('defaults blog property "likes" to 0 if missing', async () => {
    const user = await helper.randomExistingUser();
    const missingLikesObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      userId: user.id
    };
    await api
      .post('/api/blogs')
      .send(missingLikesObject)
      .expect(201);
    const blogs = await helper.blogsInDB();
    expect(blogs[blogs.length - 1].likes).toEqual(0);
  });

  test('backend responds 400 for missing title', async () => {
    const user = await helper.randomExistingUser();
    const missingTitleObject = {
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      likes: 10,
      userId: user.id
    };
    await api
      .post('/api/blogs')
      .send(missingTitleObject)
      .expect(400);
  });

  test('backend responds 400 for missing url', async () => {
    const user = await helper.randomExistingUser();
    const missingURLObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      likes: 10,
      userId: user.id
    };
    await api.post('/api/blogs')
      .send(missingURLObject)
      .expect(400);
  });
});

describe('DELETE /api/blogs', () => {

  test('successfully delete an existing blog', async () => {
    const blogsBefore = await helper.blogsInDB();
    const blogToDelete = blogsBefore[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(200);
    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter).toHaveLength(helper.InitialBlogs.length - 1);
    expect(blogsAfter).not.toContain(blogToDelete.id);
  });

  test('respond with 204 when trying to delete non-existing blog', async () => {
    const blogsBefore = await helper.blogsInDB();
    const nonExistingBlog = await helper.nonExistingBlogId();
    await api
      .delete(`/api/blogs/${nonExistingBlog}`)
      .expect(204);
    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });
});

describe('UPDATE /api/blogs', () => {

  test('successfully updates an existing blog', async () => {
    const { 0: blogToUpdate } = await helper.blogsInDB();
    const updatedBlog = { ...blogToUpdate, likes: 99 };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);
    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter[0].likes).toBe(updatedBlog.likes);
  });

  test('does not update a blog with invalid data', async () => {
    const { 0: blogToUpdate } = await helper.blogsInDB();
    const invalidBlog = { ...blogToUpdate, likes: 'fifteen' };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(invalidBlog)
      .expect(400);
    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter[0].likes).not.toBe(invalidBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});