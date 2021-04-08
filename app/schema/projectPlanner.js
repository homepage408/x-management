const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    findAllProjectPlanner: [Project]
  }

  type Project {
    id: Int
    created_by: User
    assignee: [User]
    title: String
    description: String
    status: String
    attachment: String
    is_read: Boolean
    start_date: String
    due_date: String
  }

  extend type Mutation {
    createProjectPlanner(
      created_by: Int
      title: String
      assignee: [Int]
      description: String
      status: String
      is_read: Boolean
      start_date: String
      due_date: String
    ): Project

    updateStatusProjectPlanner(id: Int, status: String): Project

    deleteProjectPlanner(id: Int): Project
  }
`;
module.exports = {
  typeDefs,
};
