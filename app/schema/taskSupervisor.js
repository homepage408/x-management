const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllTaskSupervisor: [Task]
  }

`;
module.exports = {
    typeDefs,
}
