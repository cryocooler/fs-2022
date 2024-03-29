const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, MONGODB_URI } = require("./config");
const User = require("./models/user");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// const JWT_SECRET = "BOOKDEMO";
// const MONGODB_URI =
//   "mongodb://sahin:blLmqF7cX7xOyYwH@cluster0-shard-00-00.6ikye.mongodb.net:27017,cluster0-shard-00-01.6ikye.mongodb.net:27017,cluster0-shard-00-02.6ikye.mongodb.net:27017/?ssl=true&replicaSet=atlas-13m5bq-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

mongoose.set("debug", true);

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "",
    }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);

        return { currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    introspection: true,
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

// call the function that does the setup and starts the server
start();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => {
//     const auth = req ? req.headers.authorization : null;
//     if (auth && auth.toLowerCase().startsWith("bearer ")) {
//       const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
//       const currentUser = await User.findById(decodedToken.id).populate(
//         "favouriteGenre"
//       );
//       return { currentUser };
//     }
//   },
// });

// server.listen().then(({ url, sub }) => {
//   console.log(`Server ready at ${url}`);
// });
