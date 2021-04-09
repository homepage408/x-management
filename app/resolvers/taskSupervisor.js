const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllTaskSupervisor(parent, _, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          let findTask = await connect.query("SELECT * FROM tasks");
          return findTask.rows;
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  }
}
module.exports = {
    resolvers,
}