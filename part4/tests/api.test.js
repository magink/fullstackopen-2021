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

  test('defaults blog property "likes" to 0 if missing', async () => {
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
  test('backend responds 400 for missing title', async () => {
    const missingTitleObject = {
      author: 'Kent C Dodds',
      url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
      likes: 10
    };
    await api
      .post('/api/blogs')
      .send(missingTitleObject)
      .expect(400);
  });
  test('backend responds 400 for missing url', async () => {
    const missingURLObject = {
      title: 'The State Reducer Pattern with React Hooks',
      author: 'Kent C Dodds',
      likes: 10
    };
    await api.post('/api/blogs')
      .send(missingURLObject)
      .expect(400);
  });
});

// describe('DELETE /api/blogs', () => {
//   test('successfully delete an existing blog', async () => {
//     const blogsBefore = await helper.blogsInDB();
//     const blogToDelete = blogsBefore[0];
//     console.log(blogToDelete);
//     await api.delete(`/api/blogs${blogsBefore[0].id}`)
//       .expect(204);
//     const blogsAfter = await helper.blogsInDB;
//     expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
//     console.log(blogsAfter);
//   });
// });

afterAll(() => {
  mongoose.connection.close();
});