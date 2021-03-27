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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};