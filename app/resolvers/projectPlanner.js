const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    findAllProjectPlanner: async (parent, args, { payload }) => {
      try {
        if (payload.auth.role === "planner") {
          const data = await connect.query(
            "SELECT * FROM projects WHERE created_by=$1 AND status IN($2,$3,$4,$5,$6)",
            [
              payload.auth.id,
              "submit",
              "approve",
              "reject",
              "return",
              "complete",
            ]
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

  Project: {
    created_by: async (createProjectPlanner) => {
      const data = await connect.query(
        `SELECT * FROM users WHERE users.id IN(${createProjectPlanner.created_by});`
      );
      return data.rows[0];
    },
  },

  Mutation: {
    async createProjectPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          const arrayData = args.assignee;
          const date = new Date();
          let data = await connect.query(
            "INSERT INTO projects (title,description,status,is_read,start_date,due_date,created_by) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [
              args.title,
              args.description,
              args.status,
              args.is_read,
              args.start_date,
              args.due_date,
              args.created_by,
            ]
          );
          arrayData.forEach(async (element) => {
            return await connect.query(
              `INSERT INTO member_project (user_id,project_id) VALUES($1,$2)`,
              [element, data.rows[0].id]
            );
          });
          return data.rows[0];
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteProjectPlanner(parent, args, { apyload }) {
      try {
        if (payload.auth.role === "planner") {
          const data = await connect.query(
            "DELETE FROM project WHERE id=$1 RETURNING *",
            [args.id]
          );
          return data.rows[0];
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateStatusProjectPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          const data = await connect.query(
            "SELECT * FROM projects WHERE id=$1",
            [args.id]
          );
          console.log(data.rows[0] !== undefined);
          if (data.rows[0] !== undefined) {
            const status = await connect.query(
              "UPDATE projects SET status=$1 WHERE id=$2 RETURNING *",
              [args.status, args.id]
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

module.exports = {
  resolvers,
};
