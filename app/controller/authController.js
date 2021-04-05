const { baseResponse } = require("../common/helpers/baseResponse");
// const { user } = require("../db/models");
const bcrypt = require("bcrypt");
const { generateJwt } = require("../common/middleware/auth");
const { hashing } = require("../common/helpers/hashPassword");
const connect = require("../../config/connection");

class AuthController {
  static async login(req, res, next) {
    try {
      const data = await connect.query("SELECT * FROM users WHERE email=$1", [
        req.body.email,
      ]);

      if (data.rows[0] !== undefined) {
        const check = bcrypt.compareSync(
          req.body.password,
          data.rows[0].password
        );
        if (check) {
          const payload = {
            id: data.rows[0].id,
            fullname: data.rows[0].fullname,
            username: data.rows[0].username,
            email: data.rows[0].email,
            photo: data.rows[0].photo,
            role: data.rows[0].role,
            spv_id: data.rows[0].spv_id,
          };
          payload.token = generateJwt(payload);
          return baseResponse({
            message: "logged in",
            data: { ...payload },
          })(res, 200);
        } else {
          return baseResponse({
            success: false,
            message: "wrong email or password",
          })(res, 200);
        }
      } else {
        return baseResponse({ success: false, message: "user doesn't exist" })(
          res,
          401
        );
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}
module.exports = AuthController;
