const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllTaskPlanner: [Task]
  }

  type Task {
    id: Int
    project_id: Int
    task: String
    is_check: String
  }

  extend type Mutation {
    createTaskPlanner(project_id: Int, task: String, is_check: String): Task

    updateTaskPlanner(
      id: Int
      project_id: Int
      task: String
      is_check: String
    ): Task

    deleteTaskPlanner(id: Int): Task
  }
`;
module.exports = {
  typeDefs,
};
