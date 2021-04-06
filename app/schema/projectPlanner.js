const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    findAllProjectPlanner: [Project]
  }

  type Project {
    id: Int
    assignee: Int
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
      assignee: Int
      title: String
      description: String
      status: String
      is_read: Boolean
      start_date: String
      due_date: String
    ): Project

    updateProjectPlanner(
      id: Int
      assignee: Int
      title: String
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
