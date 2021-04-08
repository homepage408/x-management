const connect = require("../../config/connection");

const resolvers = {
  Query: {
    async findAllProjectWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          const data = await connect.query(
            `SELECT DISTINCT projects.id,projects.title,projects.description,projects.status,projects.attachment,
            projects.is_read,projects.start_date,projects.due_date,projects.created_by, notes.project_id, notes.note,
            member_project.project_id from projects
            INNER JOIN member_project ON projects.id = member_project.project_id 
            LEFT JOIN notes ON projects.id=notes.project_id 
            WHERE member_project.user_id =$1 `,
            [payload.auth.id]
          );
          return data.rows;
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },


  Mutation: {
    async updateIsReadProjectWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          const status = await connect.query(
            "UPDATE projects SET is_read=$1 WHERE id=$2 RETURNING *",
            [args.is_read, args.id]
          );
          return status.rows[0];
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateStatusProjectWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          const status = await connect.query(
            "UPDATE projects SET status=$1 WHERE id=$2 RETURNING *",
            [args.status, args.id]
          );
          return status.rows[0];
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
module.exports = { resolvers };
