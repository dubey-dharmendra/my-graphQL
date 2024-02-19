const { typedefs } = require("./typedef");
const { queries } = require("./queries");
const { mutations } = require("./mutation");
const resolvers = require("./resolvers");

exports.users = { typedefs, queries, mutations, resolvers };
