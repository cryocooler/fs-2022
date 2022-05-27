const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = (request, response, next) => {
  //console.log("CALLED TOKEN EXTRACTOR");
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = jwt.verify(authorization.substring(7), process.env.SECRET);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  //console.log("EXTRACTING USER");
  const token = request.token;
  if (token) {
    const user = await User.findById(token.id);
    //console.log("DISCOVERED USER", user);
    if (user) {
      request.user = user;
    }
  }
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "ReferenceError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  logger.error(error.message);
  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
