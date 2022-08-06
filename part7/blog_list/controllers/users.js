const bcrypt = require("bcrypt");
const blog = require("../models/blog");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  console.log("pw", request.body.password);

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: "username must be unique" });
  }

  if (!username) {
    return response.status(400).json({ error: "username is required" });
  } else if (!password) {
    return response.status(400).json({ error: "password is required" });
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be min 3 characters in length" });
  } else if (username.length < 3) {
    return response
      .status(400)
      .json({ error: "username must be min 3 characters in length" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

module.exports = usersRouter;
