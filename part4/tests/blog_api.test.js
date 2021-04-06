const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
});

describe('GET /api/blogs', () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
    const blogs = helper.InitialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogs.map(blog => blog.save());
    await Promise.all(promiseArray);
  });
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
    const userToken = await helper.getToken(user.username);

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
      .set('Authorization', 'bearer ' + userToken)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDB();
    expect(blogs).toHaveLength(helper.InitialBlogs.length + 1);
    const blogTitles = blogs.map(blog => blog.title);
    expect(blogTitles).toContain(validBlogObject.title);
  });

  test('defaults blog property "likes" to 0 if missing', async () => {
    const user = await helper.randomExistingUser();
    const userToken = await helper.getToken(user.username);

    const missingLikesObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      userId: user.id
    };
    await api
      .post('/api/blogs')
      .send(missingLikesObject)
      .set('Authorization', 'bearer ' + userToken)
      .expect(201);
    const blogs = await helper.blogsInDB();
    expect(blogs[blogs.length - 1].likes).toEqual(0);
  });

  test('backend responds 400 for missing title', async () => {
    const user = await helper.randomExistingUser();
    const userToken = await helper.getToken(user.username);

    const missingTitleObject = {
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      likes: 10,
      userId: user.id
    };
    await api
      .post('/api/blogs')
      .send(missingTitleObject)
      .set('Authorization', 'bearer ' + userToken)
      .expect(400);
  });

  test('backend responds 400 for missing url', async () => {
    const user = await helper.randomExistingUser();
    const userToken = await helper.getToken(user.username);

    const missingURLObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      likes: 10,
      userId: user.id
    };
    await api.post('/api/blogs')
      .send(missingURLObject)
      .set('Authorization', 'bearer ' + userToken)
      .expect(400);
  });
  test('backend respond 401 for missing token', async () => {
    const user = await helper.randomExistingUser();

    const validBlogObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      likes: 54,
      userId: user.id
    };
    const blogsBefore = await helper.blogsInDB();
    await api
      .post('/api/blogs')
      .send(validBlogObject)
      .expect(401);
    const blogs = await helper.blogsInDB();
    expect(blogs).toHaveLength(blogsBefore.length);
  });
});

describe('DELETE /api/blogs', () => {

  test('successfully delete an existing blog', async () => {
    const user = await helper.randomExistingUser();
    const userToken = await helper.getToken(user.username);
    const blogToDelete = new Blog({
      title: 'How to Delete in Javascript',
      author: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete',
      likes: 112,
      user: user.id
    });
    await blogToDelete.save();

    const blogsBeforeDelete = await helper.blogsInDB();
    await api.delete(`/api/blogs/${blogToDelete._id}`)
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter).toHaveLength(blogsBeforeDelete.length - 1);
    expect(blogsAfter).not.toContain(blogToDelete.id);
  });

  test('respond with 404 when trying to delete without token', async () => {
    const user = await helper.randomExistingUser();

    const blogToDelete = new Blog({
      title: 'How to Delete in Javascript',
      author: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete',
      likes: 112,
      user: user.id
    });
    await blogToDelete.save();

    const blogsBeforeDelete = await helper.blogsInDB();
    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(404);
    const blogsAfterDelete = await helper.blogsInDB();
    expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length);
  });
});

describe('UPDATE /api/blogs', () => {
  test('successfully updates an existing blog', async () => {
    const user = await helper.randomExistingUser();
    const userToken = await helper.getToken(user.username);
    const blogToUpdate = new Blog({
      title: 'Node.js MongoDB Update',
      author: 'w3schools.com',
      url: 'https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp',
      likes: 65,
      user: user.id
    });
    await blogToUpdate.save();

    const updatedBlog = { ...blogToUpdate.toJSON(), likes: 99 };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'bearer ' + userToken)
      .send(updatedBlog)
      .expect(200);
    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter[blogsAfter.length - 1].likes).toBe(updatedBlog.likes);
  });

  // Above works but this gives Async timeout, why?
  test('does not update a blog with invalid data', async () => {

    const user = await helper.randomExistingUser();
    const userToken = await helper.getToken(user.username);
    const blogToUpdate = new Blog({
      title: 'Node.js MongoDB Update',
      author: 'w3schools.com',
      url: 'https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp',
      likes: 65,
      user: user.id
    });
    await blogToUpdate.save();

    const invalidBlog = { ...blogToUpdate.toJSON(), likes: 'fifteen' };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'bearer ' + userToken)
      .send(invalidBlog)
      .expect(400);
    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter[blogsAfter.length - 1].likes).not.toBe(invalidBlog.likes);

  });
});

afterAll(() => {
  mongoose.connection.close();
});