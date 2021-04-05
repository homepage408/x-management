const connect = require("../../config/connection");

const resolvers = {
  Query: {
    async findAllProjectWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          const data = await connect.query(
            "SELECT * FROM projects WHERE assignee=$1 AND status=$2",
            [args.id,"approve"]
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
    async updateIsReadProjectPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          const data = await connect.query(
            "SELECT * FROM projects WHERE id=$1",
            [args.id]
          );
          if (data.rows[0] !== undefined) {
            const status = await connect.query(
              "UPDATE projects SET is_read=$1 WHERE id=$2 RETURNING *",
              [args.is_read, args.id]
            );
            return status.rows[0];
          } else {
            throw new Error("data doesn't exist");
          }
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
