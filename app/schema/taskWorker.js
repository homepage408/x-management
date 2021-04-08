const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllTaskWorker(project_id: Int): [Task]
  }

  extend type Mutation {
    isCheck(id: Int, is_check: Boolean): Task
  }
`;
module.exports = {
  typeDefs,
};
