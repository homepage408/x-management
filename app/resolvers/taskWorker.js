const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllTaskWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          let findTask = await connect.query(
            `SELECT assignee, tasks.id , project_id, task, is_check FROM tasks 
            JOIN projects ON tasks.project_id = projects.id 
            WHERE assignee=$1`,
            [args.assignee]
          );
          return findTask.rows;
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async isCheck(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          const check = await connect.query(
            "UPDATE tasks SET is_check=$2 WHERE id=$1 RETURNING *",
            [args.id, args.is_check]
          );
          console.log(check);
          return check.rows[0];
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
