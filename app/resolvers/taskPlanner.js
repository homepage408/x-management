const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllTaskPlanner(parent, _, { payload }) {
      try {
        let findProject = await connect.query("SELECT * FROM tasks");
        return findProject.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async createTaskPlanner(parent, args, { payload }) {
      try {
        let createTask = await connect.query(
          "INSERT INTO tasks (project_id,task,is_check) VALUES ($1,$2,$3) RETURNING *",
          [args.project_id, args.task, args.is_check]
        );
        return createTask.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateTaskPlanner(parent, args, { payload }) {
      try {
        const updateTask = await connect.query(
          "UPDATE tasks SET project_id=$1,task=$2,is_check=$3 RETURNING *",
          [args.project_id, args.task, args.is_check]
        );
        console.log(updateTask);
        return updateTask.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteTaskPlanner(parent, args, { payload }) {
      try {
        const deleteTask = await connect.query(
          "DELETE FROM tasks WHERE id=$1 RETURNING *",
          [args.id]
        );
        return deleteTask.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = {
  resolvers,
};
