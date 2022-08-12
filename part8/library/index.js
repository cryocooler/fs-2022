const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./schemas/book");
const Author = require("./schemas/author");
const User = require("./schemas/user");
const jwt = require("jsonwebtoken");
require("./config");

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

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Mutation {
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const ReturnBook = await Book.findAll({ author: args.author });
        return ReturnBook;
      }
      if (args.genre) {
        const ReturnBook = await book.findAll({
          genres: { $in: [args.genre] },
        });
        return ReturnBook;
      }
      if (args.genre && args.author) {
        const ReturnBook = await book.findAll({
          genres: args.genre,
          author: args.author,
        });
        return ReturnBook;
      } else {
        const book = await Book.find({});
        return book;
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const book = new Book({ ...args });
      const author = await Author.findOne({ name: args.author });
      if (author) {
        try {
          book.author = author;
          await book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }

        return book;
      }
      try {
        const authorToSave = new Author({ name: args.author });
        await authorToSave.save();
        book.author = authorToSave;
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "favouriteGenre"
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
