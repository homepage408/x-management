const { hashing } = require("./../common/helpers/hashPassword");
const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllUser(parent, _, { payload }) {
      // console.log(payload.auth.role);
      try {
        if (payload.auth.role === "supervisor") {
          let data = await connect.query("SELECT * FROM users");
          // console.log(data.rows);
          return data.rows;
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async findOneUser(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          let data = await connect.query("SELECT * FROM users WHERE id=$1", [
            args.id,
          ]);
          return data.rows[0];
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async findAllUserWorker(parent, args, { payload }) {
      try {
        if (payload.auth.role === "planner") {
          let data = await connect.query("SELECT * FROM users WHERE role=$1", [
            "worker",
          ]);
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
    async createUser(parent, args, { payload }) {
      try {
        if (payload.auth.role === "supervisor") {
          const { salt, hash } = hashing(args.password);
          const date = new Date();
          let data = await connect.query(
            "SELECT * FROM users WHERE username=$1 OR email=$2",
            [args.username, args.email]
          );
          if (data.rows[0] === undefined) {
            const dataCreate = await connect.query(
              "INSERT INTO users (fullname,username,email,password,salt,role,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
              [
                args.fullname,
                args.username,
                args.email,
                hash,
                salt,
                args.role,
                date,
              ]
            );
            return dataCreate.rows[0];
          } else {
            throw new Error("username atau email sudah ada");
          }
        } else {
          throw new Error("you don't have permission");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateUser(parent, args, { payload }) {
      try {
        const dataUser = await connect.query(
          "SELECT username,email FROM users WHERE username=$1 OR email=$2",
          [args.username, args.email]
        );
        console.log(dataUser);
        const { salt, hash } = hashing(args.password);
        if (payload.auth.role === "supervisor") {
          if (dataUser.rows[0] === undefined) {
            // throw new Error("Data Kosong");
            const data = await connect.query(
              "UPDATE users SET fullname=$1,username=$2,email=$3,password=$4,salt=$5,role=$6 WHERE id=$7 RETURNING *",
              [
                args.fullname,
                args.username,
                args.email,
                hash,
                salt,
                args.role,
                args.id,
              ]
            );
            return data.rows[0];
          } else if (args.username == dataUser.rows[0].username) {
            throw new Error("Username sudah ada");
          } else if (args.email == dataUser.rows[0].email) {
            throw new Error("email sudah digunakan");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteUser(parent, args, { pyload }) {
      try {
        if (payload.auth.role === "supervisor") {
          const data = await connect.query(
            "DELETE FROM users WHERE id=$1 RETURNING * ",
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
  },
};

module.exports = {
  resolvers,
};
