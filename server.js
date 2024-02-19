const express = require("express");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const { expressMiddleware } = require("@apollo/server/express4");
const http = require("http");
const gqlServer = require("./graphql/index");
require("dotenv").config();
const cors = require("cors");

(async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());
    const httpServer = http.createServer(app);

    await gqlServer.start();

    app.use(
      "/graphql",
      expressMiddleware(gqlServer, {
        context: async ({ req }) => ({ token: req.headers["token"] }),
      })
    );

    await mongoose.connect(process.env.MONGODB_URI);
    if (mongoose.connections[0]._readyState === 1) {
      console.log("MongoDB is connected");

      await new Promise((resolve) =>
        httpServer.listen({ port: 4000 }, resolve)
      );

      console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    } else {
      throw new GraphQLError("MongoDB connection failed");
    }
  } catch (error) {
    throw new GraphQLError(error.message);
  }
})();
