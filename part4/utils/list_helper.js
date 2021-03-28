const _ = require('lodash');
const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogList) => {
  const reducer = (acc, curr) => acc + curr.likes;
  return blogList.reduce(reducer, 0);
};
const favoriteBlog = (blogList) => {
  const reducer = (fav, curr) => fav.likes > curr.likes ? fav : curr;
  return blogList.reduce(reducer, 0);
};
/*
1. Count number of occurrences with countBy()
2. Map author with most occurrences
3. Return new object with author and number of blogs

Returns the author who has the largest amount of blogs looking like this
{
  author: "Robert C. Martin",
  blogs: 3
}
*/
const mostBlogs = (blogList) => {
  return _.chain(blogList)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
    .value();
};


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
};
