const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);


beforeAll(async () => {
  await helper.setupTestUsers();
});

describe('post /api/login', () => {
  test('valid user get token', async () => {
    const { password, username } = helper.InitialUsers[0];
    const { body: { token } } = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200);
    expect(token).toBeDefined();
  });
  test('user with wrong password doesn\'t get token', async () => {
    const { username } = helper.InitialUsers[1];
    const { body } = await api
      .post('/api/login')
      .send({ username, password: 'wrong-password' })
      .expect(401);
    expect(body.token).not.toBeDefined();
  });

});


afterAll(() => {
  mongoose.connection.close();
});