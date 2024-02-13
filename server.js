const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const http = require("http");
const { USERS, POSTS } = require("./constant");
const cors = require("cors");
(async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      typeDefs: `type userType{
        id:Int!
        firstname:String!
        lastname:String!
        birthDate:String!
    }
    type postType{
        id:String!
        slug:String!
        title:String!
        userId:Int!
    }
    type postByType{
        id:String!
        slug:String!
        title:String!
        user:userType!
    }
    type Query{
        getAllUsers:[userType]
        getUserById(id:Int!):userType

        getAllPosts:[postType]
        getAllPostByUser:[postByType]
    }
    `,
      resolvers: {
        postByType: {
          user: (po) => USERS.find((us) => us.id == po.userId),
        },
        Query: {
          getAllUsers: () => USERS,

          getUserById: (parent, { id }) => USERS.find((e) => e.id === id),

          getAllPosts: () => POSTS,
          getAllPostByUser: () => POSTS,
        },
      },
    });

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  } catch (error) {
    console.log(error.message);
  }
})();
