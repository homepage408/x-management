const connect = require("../../config/connection");

const resolvers = {
  Query: {
    async findAllProjectSupervisor(parent, _, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          const data = await connect.query(
            `SELECT DISTINCT projects.id,projects.title,projects.description,projects.status,projects.attachment,
            projects.is_read,projects.start_date,projects.due_date,projects.created_by, notes.project_id, notes.note,
            member_project.project_id from projects
            INNER JOIN member_project 
            ON projects.id = member_project.project_id 
            LEFT JOIN notes ON projects.id=notes.project_id 
            WHERE status IN($1,$2,$3,$4,$5,$6,$7)`,
            [
              "submit",
              "approve",
              "reject",
              "return",
              "return to worker",
              "complete",
              "done"
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

    async findOneProjectSupervisor(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          const data = await connect.query(
            `SELECT DISTINCT projects.id,projects.title,projects.description,projects.status,projects.attachment,
          projects.is_read,projects.start_date,projects.due_date,projects.created_by, 
          member_project.project_id from projects 
          INNER JOIN member_project 
          ON projects.id = member_project.project_id 
          WHERE projects.id=${args.id}`
          );
          return data.rows[0];
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
            "UPDATE projects SET status=$1 WHERE id=$2 RETURNING *",
            [args.status, args.id]
          );
          // console.log(data.rows);
          return data.rows[0];
        } else {
          throw new Error("you dont't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateStatusReturnSupervisor(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          const data = await connect.query(
            `UPDATE projects SET status='return' WHERE id=$1 RETURNING *`,
            [args.id]
          );
          // console.log(args.note);
          // console.log(data.rows[0].id);
          const note = await connect.query(
            `INSERT INTO notes (project_id,note) VALUES($1,$2)`,
            [data.rows[0].id, args.note]
          );
          // console.log(data.rows);
          return data.rows[0];
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateStatusReturnToWorkerSupervisor(parent, args,{payload}){
      try {
        if (payload.auth.role === "supervisor") {
          const data = await connect.query(
            `UPDATE projects SET status='return to worker' WHERE id=$1 RETURNING *`,
            [args.id]
          );
          // console.log(args.note);
          // console.log(data.rows[0].id);
          const note = await connect.query(
            `INSERT INTO notes (project_id,note) VALUES($1,$2)`,
            [data.rows[0].id, args.note]
          );
          // console.log(data.rows);
          return data.rows[0];
        } else {
          throw new Error("you dont have permission")
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  },
};
module.exports = {
  resolvers,
};
