const listHelper = require('../list_helper');

console.log(listHelper);

test('dummy retuns 1', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});