const connect = require("../../config/connection");

const resolvers = {
  Query: {
    async findAllNoteSupervisor(parent, _, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          let findNote = await connect.query("SELECT * FROM notes");
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
    async createNoteSupervisor(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
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
    async updateNoteSupervisor(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
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
    async deleteNoteSupervisor(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
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
