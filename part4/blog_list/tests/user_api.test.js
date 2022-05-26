const bcrypt = require("bcrypt");
const usersRouter = require("../controllers/users");
const User = require("../models/user");
const helper = require("./test_helper.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("when db is initialized with 1 user", () => {
  test("Creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Gamma Ray",
      name: "Plankton Selcius",
      password: "algae",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("invalid user input is rejected when", () => {
  test("username is too short", async () => {
    const newUser = {
      username: "ao",
      name: "whelp",
      password: "adada",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const msg = await api.post("/api/users").send(newUser);
    expect(msg.text).toContain("username must be min 3 characters in length");
  }, 10000);

  test("password is too short", async () => {
    const newUser = {
      username: "Plank",
      name: "Charlton",
      password: "ok",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const msg = await api.post("/api/users").send(newUser);
    expect(msg.text).toContain("password must be min 3 characters in length");
  }, 10000);

  test("password is undefined", async () => {
    const newUser = {
      username: "Plank",
      name: "Charlton",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const msg = await api.post("/api/users").send(newUser);
    expect(msg.text).toContain("password is required");
  }, 10000);

  test("username is undefined", async () => {
    const newUser = {
      name: "Charlton",
      password: "gammaray",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const msg = await api.post("/api/users").send(newUser);
    expect(msg.text).toContain("username is required");
  }, 10000);

  test("username already exists in database", async () => {
    const newUser = {
      username: "root",
      name: "Charlton",
      password: "gammaray",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const msg = await api.post("/api/users").send(newUser);
    expect(msg.text).toContain("username must be unique");
  }, 10000);
});
