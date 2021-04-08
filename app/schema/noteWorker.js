const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllNoteWorker(id: Int, project_id: Int): [Note]
  }
  extend type Mutation {
    createNoteWorker(project_id: Int, note: String): Note

    updateNoteWorker(id: Int, project_id: Int, note: String): Note

    deleteNoteWorker(id: Int): Note
  }
`;
module.exports = {
  typeDefs,
};
