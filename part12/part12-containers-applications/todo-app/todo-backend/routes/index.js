const express = require("express");
const redis = require("../redis");
const { Todo } = require("../mongo");
const configs = require("../util/config");
const router = express.Router();

const { setAsync, getAsync } = require("../redis/index");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  const stats = await getAsync("added_todos");

  if (stats) {
    const statObj = { added_todos: stats };
    res.send(statObj);
  } else {
    res.send({ Todos: 0 });
  }
});
module.exports = router;
