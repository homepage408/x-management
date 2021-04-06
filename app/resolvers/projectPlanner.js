const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllProjectPlanner(parent, _, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          let data = await connect.query(
            'SELECT * FROM projects LEFT JOIN users AS "User" ON ("User"."id" = projects.assignee)'
          );
          console.log(data);
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
    async createProjectPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          const date = new Date();
          let data = await connect.query(
            "INSERT INTO projects (assignee,title,description,status,is_read,start_date,due_date) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [
              args.assignee,
              args.title,
              args.description,
              args.status,
              args.is_read,
              args.start_date,
              args.due_date,
            ]
          );
          return data.rows[0];
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateProjectPlanner(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          const data = await connect.query(
            "UPDATE projects SET assignee=$1,title=$2,description=$3,status=$4,is_read=$5,start_date=$6,due_date=$7 WHERE id=$8 RETURNING *",
            [
              args.assignee,
              args.title,
              args.description,
              args.status,
              args.is_read,
              args.start_date,
              args.due_date,
              args.id,
            ]
          );
          console.log(data);
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
