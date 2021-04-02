const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');


const helper = require('./test_helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const hashedUsers = helper.InitialUsers.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const hashedUser =  new User({
      username: user.username,
      name: user.name,
      hashedPassword
    });
    return hashedUser.save();
  });
  await Promise.all(hashedUsers);
});

describe('Testing user api', () => {

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

    test('a valid user is added', async () => {
      const validUser = { username: 'valid_user', password: 'newPassword1234' };
      await api
        .post('/api/users')
        .send(validUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const users = await helper.usersInDB();
      expect(users).toHaveLength(helper.InitialUsers.length + 1);
    });

    test('a valid user got password hashed successfully', async () => {
      const beforeUser = { username: 'valid_user', password: 'notHashedPassword' };
      await api
        .post('/api/users')
        .send(beforeUser)
        .expect(201);
      const afterUser = await User.findOne( { username: beforeUser.username } );
      const pass = await User.comparePassword(beforeUser.password, afterUser.hashedPassword);
      expect(pass).toBeTruthy();
    });

    test('a non-valid user missing username is not added', async () => {
      const missingUsernameUser = { password: 'abc123', name: 'Boga Elhassan' };
      await api
        .post('/api/users')
        .send(missingUsernameUser)
        .expect(400);
      const users = await helper.usersInDB();
      expect(users).toHaveLength(helper.InitialUsers.length);
    });

    test('a non-valid user missing password is not added', async () => {
      const missingPassUser = { username: 'nonvalid_user' };
      await api
        .post('/api/users')
        .send(missingPassUser)
        .expect(400);
      const users = await helper.usersInDB();
      expect(users).toHaveLength(helper.InitialUsers.length);
    });

    test('a non-valid user with too short password is not added', async () => {
      const tooShortPassUser = { username: 'nonvalid_user', password: '123' };
      await api
        .post('/api/users')
        .send(tooShortPassUser)
        .expect(400);
      const users = await helper.usersInDB();
      expect(users).toHaveLength(helper.InitialUsers.length);
    });

    test('already existing user is not added', async () => {
      const duplicateUser = helper.InitialUsers[0];
      const response = await api
        .post('/api/users')
        .send(duplicateUser)
        .expect(400);
      const users = await helper.usersInDB();
      expect(users).toHaveLength(helper.InitialUsers.length);
    });

  });

});

afterAll(() => {
  mongoose.connection.close();
});