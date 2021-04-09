const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllTaskWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "worker") {
          let findTask = await connect.query(
            `select member_project.user_id, member_project.project_id,
            projects.title,projects.description, projects.status,projects.attachment,tasks.project_id, tasks.task, tasks.is_check 
            FROM member_project
            INNER JOIN projects ON projects.id = member_project.project_id
            INNER JOIN tasks ON projects.id = tasks.project_id
            WHERE member_project.user_id = $1;
            ;`,[payload.auth.id]
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
