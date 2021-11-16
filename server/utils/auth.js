const jwt = require('jsonwebtoken');

const secret = "codesharerssecret";

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
  
    }
    
}
