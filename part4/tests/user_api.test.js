const mongoose = require('mongoose');
const supertest = require('supertest');

const helper = require('./test_helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const users = helper.InitialUsers.map(user => new User(user));
  const promiseArray = users.map(user => user.save());
  await Promise.all(promiseArray);
});

describe('GET /api/users', () => {

  // test('user is returned as json', async () => {
  //   const response = await api.get('/api/users')
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/);
  // });

  // test('correct amount of users', async () => {
  //   const { body } = await api.get('/api/users');
  //   expect(body).toHaveLength(helper.InitialUsers.length);
  // });
});

describe('POST /api/users', () => {

  test('a valid unique user is added', async () => {
    const validUser = { username: 'valid_user', password: 'newPassword1234' };
    const response = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.InitialUsers.length + 1);
  });

  test('a non valid user is not added', async () => {
    const nonValidUser = { username: 'nonvalid_user' };
    await api
      .post('/api/users')
      .send(nonValidUser)
      .expect(400);
    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.InitialUsers.length);
  });

  test('a valid user got password hashed successfully', async () => {
    const beforeUser = { username: 'valid_user', password: 'notHashedPassword' };
    await api
      .post('/api/users')
      .send(beforeUser)
      .expect(201);
    const afterUser = await User.findOne( { username: beforeUser.username } );
    const pass = await User.comparePassword(beforeUser.password, afterUser.password);
    expect(pass).toBeTruthy();
  });
});


afterAll(() => {
  mongoose.connection.close();
});