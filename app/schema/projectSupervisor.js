const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    findAllProjectSupervisor: [Project]
  }
  extend type Mutation {
    updateStatusProjectSupervisor(id: Int, status: String): Project

  }
`;

module.exports={
    typeDefs
}