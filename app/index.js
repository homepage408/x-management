const express = require("express");
const port = process.env.PORT || 3000;
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const cors = require("cors");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { router: routerIndex } = require("./routes/index");
const {
  verifyJwt,
  verifyJwtRest,
  permit,
} = require("./common/middleware/auth");
const cloudinary = require("./common/helpers/cloudinary");
const { uploadAttachment } = require("./common/helpers/multer");
const connect = require("../config/connection");
const app = express();
const router = express.Router();

app.use(express.json());

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization;
    if (!auth) throw new AuthenticationError("you must be logged in");
    const result = verifyJwt(auth);
    payload = {
      auth: result,
    };
    return {
      payload,
    };
  },
  playground: {
    settings: {
      "editor.theme": "light",
    },
  },
  introspection: true,
});
server.applyMiddleware({ app });

app.get("/", async (req, res) => {
  return res.json({
    message: "welcome graphql query",
  });
});

app.patch(
  "/upload/attachment/:id",[verifyJwtRest,permit("worker")],
  uploadAttachment.single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const data = await connect.query(
        "UPDATE projects SET attachment=$1 WHERE id=$2",
        [result.url, req.params.id]
      );
      if (data) {
        res.json({ message: "berhasil" });
      }
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }
);

app.use("/api", routerIndex);
app.use(router);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
