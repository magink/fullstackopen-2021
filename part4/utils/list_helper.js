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
/*  Steps
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

/*  Steps
  1. Group individual authors.
  2. Sum all likes of author group
  3. Find author with most likes
  4. Return author object

  Return the author with most likes and the total number of likes. Should look like this
  {
    author: "Edsger W. Dijkstra",
    likes: 17
  }
*/

const mostLikes = (blogList) => {
  return _.chain(blogList)
    .groupBy('author') // Create groups by making author a key for the object
    .mapValues(author => _.sumBy(author, 'likes')) // Make total 'likes' a value of previous author key
    // .map((likes, author) => { // Ugly solution. lodash alternatives?
    //   return {
    //     author: author,
    //     likes: likes
    //   };
    // })
    .entries() // make an array
    .map(values => _.zipObject(['author', 'likes'], values)) // merge values array with a new key array
    .maxBy('likes')
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
