const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllNote(parent, _, { payload }) {
      try {
        let findNote = await connect.query("SELECT * FROM notes");
        return findNote.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async createNote(parent, args, { payload }) {
      try {
        let createNote = await connect.query(
          "INSERT INTO notes (project_id,note) VALUES ($1,$2,$3) RETURNING *",
          [args.project_id, args.note]
        );
        return createNote.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateNote(parent, args, { payload }) {
      try {
        let updateNote = await connect.query(
          "UPDATE notes SET project_id=$1,note=$2 RETURNING *",
          [args.project_id, args.note]
        );
        return updateNote.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteNote(parent, args, { payload }) {
      try {
        const deleteNote = await connect.query(
          "DELETE FROM notes where id=$1 RETURNING *",
          [args.id]
        );
        return deleteNote.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
module.exports = {
  resolvers,
};
