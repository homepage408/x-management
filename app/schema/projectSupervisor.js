const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    findAllProjectSupervisor: [Project]
  }
  extend type Mutation {
    updateStatusProjectSupervisor(id: Int, status: String): Project
    updateStatusReturnSupervisor(id: Int): Project
    updateStatusReturnToWorkerSupervisor(id: Int): Project
  }
`;

module.exports = {
  typeDefs,
};
