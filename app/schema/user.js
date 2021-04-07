const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllUser: [User]
    findOneUser(id: Int): User
  }

  type User {
    id: Int
    fullname: String
    username: String
    email: String
    password: String
    salt: String
    role: String
  }

  extend type Mutation {
    createUser(
      fullname: String!
      username: String!
      email: String!
      password: String!
      salt: String
      role: String!
    ): User

    updateUser(
      id: Int
      fullname: String!
      username: String!
      email: String!
      password: String!
      salt: String
      role: String!
    ): User

    deleteUser(id: Int): User
  }
`;

module.exports = {
  typeDefs,
};
