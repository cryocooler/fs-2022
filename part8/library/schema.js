const { gql } = require("apollo-server");

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
    books: [Book!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Query {
    me: User
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

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
