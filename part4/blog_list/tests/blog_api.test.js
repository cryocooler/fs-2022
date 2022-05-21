const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const listHelper = require("../utils/list_helper");
const helper = require("../tests/test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});
describe("tests for get and post end points", () => {
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

  test("the first blog in the db is the first blog in the array", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].author).toBe("Michael Chan");
  });

  test("unique identifier is ID", async () => {
    const response = await api.get("/api/blogs");
    //console.log("response IS", Object.keys(response.body[0]));
    expect(Object.keys(response.body[0])[4]).toBe("id");
  });

  test("a new blog can be succesfully created", async () => {
    const newBlog = {
      title: "tickle your fancy",
      author: "Sara vanninen",
      url: "https://tickleyourfancy.blogspot.com",
      likes: 50000,
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const response = await api.get("/api/blogs");
    const count = response.body.map((r) => r.id);
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("undefined likes defaults to 0", async () => {
    const newBlog = {
      title: "tickle your fancy",
      author: "Sara vanninen",
      url: "https://tickleyourfancy.blogspot.com",
    };

    await await api.post("/api/blogs").send(newBlog).expect(201);

    const res = await api.get("/api/blogs");
    const length = res.body.length;
    //console.log("lenght", length);
    const likes = res.body[length - 1].likes;
    //console.log("LIKES", likes);
    expect(likes).toBe(0);
  });

  test("missing title and url returns bad request", async () => {
    const newBlog = {
      title: "tickle your fancy",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  }, 10000);
});

describe("tests for delete endpoint", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const dbBlogs = await helper.blogsInDb();
    console.log(dbBlogs);

    const blogToDelete = dbBlogs[0];
    console.log("blog id for deletion", blogToDelete);
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1);
  });
  test("fails with 204 if id is invalid", async () => {
    const badId = "axadasdasdas";
    await api.delete(`/api/blogs/${badId}`).expect(204);
  });
});
describe("updating blog information", () => {
  test("blog likes can be updated", async () => {
    const blog = {
      likes: 100,
    };
    const dbBlogs = await helper.blogsInDb();
    const blogToUpdate = dbBlogs[0];
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(204);
    const updatedBlog = await helper.blogsInDb();
    expect(updatedBlog[0].likes).toBe(blog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
