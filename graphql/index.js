const { ApolloServer } = require("@apollo/server");
const { users } = require("./users");
const gqlServer = new ApolloServer({
  typeDefs: `
              ${users.typedefs}
              
              type Query{
                ${users.queries}
              }
              type Mutation{
               ${users.mutations}
            }
            `,
  resolvers: {
    Query: { ...users.resolvers.queries },
    Mutation: { ...users.resolvers.mutations },
  },
});

module.exports = gqlServer;
