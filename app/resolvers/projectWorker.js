const connect = require("../../config/connection");

const resolvers = {
  Query: {
    async findAllProjectWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          const data = await connect.query(
            "SELECT * FROM projects WHERE assignee=$1 AND status IN ($2,$3,$4,$5)",
            [payload.auth.id, "approve", "return to worker", "done", "complete"]
          );
          // console.log(data.rows);
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
            "UPDATE projetcs SET status=$1 WHERE id=$2",
            [args.status, args.id]
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
module.exports = { resolvers };
