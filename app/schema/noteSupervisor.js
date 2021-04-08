const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllNoteSupervisor: [Note]
  }

  type Note {
    id: Int
    project_id: Int
    note: String
  }

  extend type Mutation {
    createNoteSupervisor(project_id: Int, note: String): Note

    updateNoteSupervisor(id: Int, project_id: Int, note: String): Note

    deleteNoteSupervisor(id: Int): Note
  }
`;
module.exports = {
  typeDefs,
};
