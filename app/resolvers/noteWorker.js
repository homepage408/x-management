const connect = require("../../config/connection");

const resolvers = {
  Query: {
    async findAllNoteWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          let findNote = await connect.query(
            `SELECT assignee, notes.id , project_id, note, FROM notes 
        JOIN projects ON notes.project_id = projects.id 
        WHERE assignee=$1, project_id=$2`,
            [args.assignee, args.project_id]
          );
          return findNote.rows;
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async createNoteWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          let createNote = await connect.query(
            "INSERT INTO notes (project_id,note) VALUES ($1,$2) RETURNING *",
            [args.project_id, args.note]
          );
          return createNote.rows[0];
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateNoteWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          let updateNote = await connect.query(
            "UPDATE notes SET project_id=$1,note=$2 RETURNING *",
            [args.project_id, args.note]
          );
          return updateNote.rows[0];
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteNoteWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          const deleteNote = await connect.query(
            "DELETE FROM notes where id=$1 RETURNING *",
            [args.id]
          );
          return deleteNote.rows[0];
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
module.exports = {
  resolvers,
};
