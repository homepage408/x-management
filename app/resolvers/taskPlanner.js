const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllTaskPlanner(parent, _, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          let findTask = await connect.query("SELECT * FROM tasks");
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
    async createTaskPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          let createTask = await connect.query(
            "INSERT INTO tasks (project_id,task,is_check) VALUES ($1,$2,$3) RETURNING *",
            [args.project_id, args.task, false]
          );
          return createTask.rows[0];
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateTaskPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          const updateTask = await connect.query(
            "UPDATE tasks SET project_id=$1,task=$2,is_check=$3 RETURNING *",
            [args.project_id, args.task, false]
          );
          console.log(updateTask);
          return updateTask.rows[0];
        } else {
          throw new Error("Access Denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteTaskPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          const deleteTask = await connect.query(
            "DELETE FROM tasks WHERE id=$1 RETURNING *",
            [args.id]
          );
          return deleteTask.rows[0];
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
