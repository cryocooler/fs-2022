const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "No token provided" });
  }
  //console.log("PICKED TOCKEN", request.token);
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  //console.log("blog to delete", blogToDelete);
  if (!blogToDelete) {
    console.log("blog doesnt exist");
    return response.status(400).json({ error: "blog does not exist" });
  }
  // console.log("request user", request.user);
  //console.log("blog user", blogToDelete.user);
  //console.log("blogtodelete", blogToDelete.user.toString());
  if (!request.user || !blogToDelete.user) {
    console.log("undefined users");
    return response.status(400).json({ error: "undefined user" });
  }
  console.log(request.user._id);
  if (request.user._id.toString() !== blogToDelete.user.toString()) {
    console.log("different user trying to delete");
    return response.status(401).json({ error: "unauthorized deletion" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
  // I can get the token passed in the request. Then I can find the user corresponding to the token.
  // if the found user's id is not equivalent to the blog creator's id, return 400

  //await Blog.findByIdAndDelete(request.params.id);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(204).end();
});

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

module.exports = blogsRouter;
