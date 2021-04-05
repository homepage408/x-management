const connect = require("../../config/connection");

const resolvers = {
  Query: {
    async findAllProjectSupervisor(parent, _, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          const data = await connect.query(
            "SELECT * FROM projects WHERE status IN ($1,$2)",
            ["submit", "done"]
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
    async updateStatusProjectSupervisor(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          const data = await connect.query(
            "UPDATE projects SET status=$1 RETURNING *",
            [args.status]
          );
          console.log(data.rows);
          return data.rows[0];
        } else {
          throw new Error("you dont't have permission");
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
