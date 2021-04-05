const { gql } = require("apollo-server-express");
const { typeDefs: user } = require("./user");
const { typeDefs: projectPlanner } = require("./projectPlanner");
const { typeDefs: projectSupervisor } = require("./projectSupervisor");

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user, projectPlanner, projectSupervisor];
module.exports = {
  typeDefs,
};
