const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const userServices = require("../../services/userService");
const { verifyToken } = require("../../middilewares/auth");
const { sendEmail } = require("../../helper.js/sendEmail");
const Buffer = require("buffer");
const { createReadStream, existsSync, mkdirSync } = require("fs");

const g_otp = Math.floor(100000 + Math.random() * 900000);

exports.queries = {
  getAllUser: async (_, args, context) => {
    try {
      const signedUser = verifyToken(context.token);
      if (signedUser) {
        const getUsers = await userServices.getUsers();
        if (!getUsers) throw new GraphQLError("getAllUser Failed");
        return getUsers;
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
};
exports.mutations = {
  createUser: async (_, { input }) => {
    try {
      const insertedUser = await userServices.createUser(input);
      if (!insertedUser) throw new GraphQLError("insertion Failed");

      const saveOtpToDb = await userServices.saveOtp(insertedUser, g_otp);

      if (saveOtpToDb) {
        const mailedID = await sendEmail(insertedUser, g_otp);
        if (mailedID) return "Email has been sent on your register Email-Id";
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  loginUser: async (_, { input }) => {
    try {
      const { email, password } = input;

      if (email && password) {
        let userInfo = await userServices.findByEmail(email);
        console.log(userInfo);
        if (userInfo) {
          if (password === userInfo.password) {
            const token = jwt.sign(
              { _id: userInfo._id, email: userInfo.email },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: process.env.TOKEN_EXPIREIN }
            );
            userInfo.token = token;
            return userInfo;
          } else throw new GraphQLError("Invalid credintials ");
        } else throw new GraphQLError("User Doesn't Exist ");
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  verifyOtp: async (_, { input }) => {
    const { _id, otp } = input;
    const verifedOtp = await userServices.verifyOtp(_id);
    if (verifedOtp) {
    }
  },
};
