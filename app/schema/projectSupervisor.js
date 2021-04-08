const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    findAllProjectSupervisor: [Project]
    findOneProjectSupervisor(id: Int): Project
  }
  extend type Mutation {
    updateStatusProjectSupervisor(id: Int, status: String): Project
    updateStatusReturnSupervisor(id: Int, note: String): Project
    updateStatusReturnToWorkerSupervisor(id: Int, note:String): Project
  }
`;

module.exports = {
  typeDefs,
};
