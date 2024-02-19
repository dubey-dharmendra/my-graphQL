exports.mutations = `#grapghql
    createUser(input:createUserType):String,

    loginUser(input:loginArguType):userLoginType
    
    verifyOtp(input:verifyOtpType):String
  
`;
