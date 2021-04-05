const { hashing } = require("./../common/helpers/hashPassword");
const connect = require("./../../config/connection");

const resolvers = {
  Query: {
    async findAllUser(parent, _, { payload }) {
      try {
        let data = await connect.query("SELECT * FROM users");
        // console.log(data.rows);
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },

    async findOneUser(parent, args, { payload }) {
      let data = await connect.query(
        "SELECT * FROM users WHERE id=$1",
        [args.id]
      );
      return data.rows[0];
    },
  },

  Mutation: {
    async createUser(parent, args, { payload }) {
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
    },

    async deleteUser(parent, args, { pyload }) {
      const data = await connect.query(
        "DELETE FROM users WHERE id=$1 RETURNING * ",
        [args.id]
      );
      return data.rows[0];
    },
  },
};

module.exports = {
  resolvers,
};
