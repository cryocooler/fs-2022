const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
// const { v1: uuid } = require("uuid");
// const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const ReturnBook = await Book.findAll({ author: author }).populate(
          "author"
        );
        return ReturnBook;
      }
      if (args.genre) {
        console.log("trigger");
        const ReturnBook = await Book.find({
          genres: { $in: [args.genre] },
        }).populate("author");
        console.log(ReturnBook);
        return ReturnBook;
      }
      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author });
        const ReturnBook = await Book.find({
          author: author,
          genres: { $in: [args.genre] },
        }).populate("author");
        return ReturnBook;
      } else {
        const book = await Book.find({}).populate("author");
        return book;
      }
    },
    allAuthors: async () => Author.find({}).populate("books"),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author");
      const authors = await Author.find({}).populate("books");

      // const author = await Author.findOne({ name: root.name });
      console.log("author.find");
      return authors.map((author) => author.books).length;
      console.log("book.find");
      return authorBooks.length;

      // bookCount: async () => {
      //   const authors = Author.find({});
      //   const books = Book.find({});

      //   return authors.map((author) => {
      //     return {bookCount: books.filter(
      //       (book) => book.author.toString() === author._id.toString()
      //     ).length;
      //     }
      //   });
    },
    // },
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
        pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
      pubsub.publish("BOOK_ADDED", { bookAdded: book });

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

      if (!user || args.password !== "library2022") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
