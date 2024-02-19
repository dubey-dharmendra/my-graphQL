const { gql } = require("apollo-server");

exports.typedefs = `#graphql
  type User {
    _id: ID!
    name: String!
    email: String!
    mobile: String!
    createdAt: String!
    updatedAt: String!
  }

  type userLoginType {
    _id: String!
    name: String!
    email: String!
    mobile: String!
    token: String!
  }

  input createUserType {
    name: String!
    email: String!
    password: String!
    mobile: String!
  }

  input loginArguType {
    email: String!
    password: String!
  }
  input verifyOtpType {
    email: String!
    otp: String!
  }
`;
