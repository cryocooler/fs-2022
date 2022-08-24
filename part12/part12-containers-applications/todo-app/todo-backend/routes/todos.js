const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { setAsync, getAsync } = require("../redis/index");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  setAsync("added_todos", todos.length);
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  console.log("post in progressSE");
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);

  let value = await getAsync("added_todos");
  newValue = value ? Number(value) + 1 : 1;
  setAsync("added_todos", newValue);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = await req.todo;
  res.send(todo);
  // res.sendStatus(405);
  // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = {
    done: req.todo.done === false ? true : false,
  };
  await Todo.findByIdAndUpdate(req.todo.id, todo, { new: true });
  res.sendStatus(200);

  // res.sendStatus(405);
  // Implement this
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
