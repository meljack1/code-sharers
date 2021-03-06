const jwt = require('jsonwebtoken');

require("dotenv").config()

const secret = process.env.JWT_SECRET || "codesharerssecret";

const expiration = "2h"; 


module.exports = {
    authMiddleware: function ({ req }) {
      // allows token to be sent via req.body, req.query, or headers

      let token = req.body.token || req.query.token || req.headers.authorization;

      // We split the token string into an array and return actual token
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }

      if (!token) {
        return req;
      }

//add try+ catch function to add users data to request if the token has been verified 
    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
      }

      // return the request object so it can be passed to the resolver as `context`
    return req;
  
    },
   // Synchronously sign the given payload into a JSON Web Token string
    signToken: function ({email, username, _id}) {
          const payload = {email , username , _id};
          return jwt.sign( { data: payload}, secret, {expiresIn : expiration});
    },
    
};
