const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const listHelper = require("../utils/list_helper");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

test("the first blog is authored by Michael Chan", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].author).toBe("Michael Chan");
});

test("unique identifier is ID", async () => {
  const response = await api.get("/api/blogs");
  //console.log("response IS", Object.keys(response.body[0]));
  expect(Object.keys(response.body[0])[4]).toBe("id");
});

test("A new blog can be succesfully created", async () => {
  const newBlog = {
    title: "tickle your fancy",
    author: "Sara vanninen",
    url: "https://tickleyourfancy.blogspot.com",
    likes: 50000,
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const response = await api.get("/api/blogs");
  const count = response.body.map((r) => r.id);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
