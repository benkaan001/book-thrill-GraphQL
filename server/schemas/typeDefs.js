// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type Query {
    me: User
  }
  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    title: String
    image: String
    link: String
  }
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  input bookInput {
    authors: [String]
    description: String
    bookId: String
    title: String
    image: String
    link: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: bookInput): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
