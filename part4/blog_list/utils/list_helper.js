const { count } = require("../models/blog");

_ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((x, y) => x + y.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce(
    (x, y) => (x.likes > y.likes ? x : y),
    blogs,
    null
  );
  return mostLiked;
};

const mostBlogs = (blogs) => {
  var freq = _.countBy(blogs, "author");
  var most = _.maxBy(_.entries(freq));

  return { author: most[0], blogs: most[1] };
};

const mostLikes = (blogs) => {
  var most = _.chain(blogs)
    .groupBy("author")
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, "likes"),
    }))
    .maxBy("likes")
    .value();

  return most;
};

const blogID = (blog) => {
  const blogid = Object.keys(blog);
  console.log(blogid);
  return blogid;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogID,
};
